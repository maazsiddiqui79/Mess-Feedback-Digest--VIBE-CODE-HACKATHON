from rest_framework import serializers
from .models import CommunityPost, CommunityMedia

class CommunityMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityMedia
        fields = ['id', 'media_type', 'file', 'created_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        request = self.context.get('request')
        if instance.file:
            ret['file'] = request.build_absolute_uri(instance.file.url) if request else instance.file.url
        return ret

class CommunityPostSerializer(serializers.ModelSerializer):
    author_email = serializers.CharField(source='author.email', read_only=True)
    author_name  = serializers.SerializerMethodField()
    media = CommunityMediaSerializer(many=True, read_only=True)

    class Meta:
        model = CommunityPost
        fields = ['id', 'author_email', 'author_name', 'post_type', 'content', 'created_at', 'media']
        read_only_fields = ['author_email', 'author_name', 'created_at']

    def get_author_name(self, obj):
        try:
            return obj.author.student_profile.name or obj.author.email.split('@')[0]
        except Exception:
            return obj.author.email.split('@')[0]

    def create(self, validated_data):
        user = self.context['request'].user
        return CommunityPost.objects.create(author=user, **validated_data)
