from rest_framework import serializers
from .models import User, StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    email       = serializers.CharField(source='user.email', read_only=True)
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = [
            'email', 'student_id', 'hostel', 'room',
            'profile_image', 'name', 'description',
            'linkedin_url', 'github_url'
        ]
        extra_kwargs = {
            'student_id': {'required': False},
        }

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return obj.profile_image.url if obj.profile_image else ''

class UserSerializer(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'is_active', 'created_at', 'student_profile']

class RegisterSerializer(serializers.ModelSerializer):
    password    = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    student_id  = serializers.CharField(write_only=True, required=False)
    hostel      = serializers.CharField(write_only=True, required=False)
    room        = serializers.CharField(write_only=True, required=False)
    name        = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'student_id', 'hostel', 'room', 'name']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id', f"STU{User.objects.count():04d}")
        hostel     = validated_data.pop('hostel', '')
        room       = validated_data.pop('room', '')
        name       = validated_data.pop('name', '')

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role='STUDENT'
        )

        StudentProfile.objects.create(
            user=user,
            student_id=student_id,
            hostel=hostel,
            room=room,
            name=name,
        )
        return user


# ── Admin-facing serializers ──────────────────────────────────
class UserAdminSerializer(serializers.ModelSerializer):
    """Full user record for admin management."""
    student_profile = StudentProfileSerializer(read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'is_active', 'is_staff', 'created_at', 'student_profile', 'password']
        read_only_fields = ['created_at']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)

class CreateManagerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(choices=['MANAGER', 'ADMIN'], default='MANAGER', write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'role']

    def create(self, validated_data):
        role = validated_data.get('role', 'MANAGER')
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=role
        )
