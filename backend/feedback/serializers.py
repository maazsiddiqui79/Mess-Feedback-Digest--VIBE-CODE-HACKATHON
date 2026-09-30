from rest_framework import serializers
from .models import Feedback, FeedbackMedia
from meals.models import Meal

class FeedbackMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackMedia
        fields = ['id', 'media_type', 'file', 'created_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if instance.file and request:
            representation['file'] = request.build_absolute_uri(instance.file.url)
        return representation

class FeedbackSerializer(serializers.ModelSerializer):
    media            = FeedbackMediaSerializer(many=True, read_only=True)
    custom_meal_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    student_email    = serializers.CharField(source='student.email', read_only=True)
    meal_name        = serializers.SerializerMethodField()
    analysis         = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = [
            'id', 'meal', 'meal_name', 'custom_meal_name', 'student_email',
            'rating', 'issue_tags', 'positive_tags', 'custom_remark',
            'is_anonymous', 'status', 'created_at', 'media', 'analysis'
        ]
        read_only_fields = ['status', 'created_at', 'student_email', 'meal_name']
        extra_kwargs = {
            'meal': {'required': False, 'allow_null': True},
        }

    def get_meal_name(self, obj):
        return obj.meal.name if obj.meal else 'Custom Meal'

    def get_analysis(self, obj):
        try:
            a = obj.analysis
            return {
                'sentiment': a.sentiment,
                'severity':  a.severity,
                'summary':   a.summary,
            }
        except Exception:
            return None

    def create(self, validated_data):
        custom_meal_name = validated_data.pop('custom_meal_name', None)
        meal = validated_data.get('meal', None)

        if not meal and custom_meal_name:
            from django.utils import timezone
            meal = Meal.objects.create(
                name=custom_meal_name,
                meal_type='LUNCH',
                date=timezone.now().date(),
                start_time='00:00',
                end_time='23:59',
                is_active=False
            )
            validated_data['meal'] = meal

        user = self.context['request'].user
        return Feedback.objects.create(student=user, **validated_data)
