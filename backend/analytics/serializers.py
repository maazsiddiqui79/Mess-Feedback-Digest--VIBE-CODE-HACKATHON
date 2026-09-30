from rest_framework import serializers
from feedback.models import Feedback
from ai_engine.models import DailyDigest

class DailyDigestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyDigest
        fields = '__all__'

from feedback.serializers import FeedbackMediaSerializer

class DashboardFeedbackSerializer(serializers.ModelSerializer):
    student_email = serializers.SerializerMethodField()
    meal_name = serializers.CharField(source='meal.name', read_only=True)
    media = FeedbackMediaSerializer(many=True, read_only=True)
    analysis = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = ['id', 'student_email', 'meal_name', 'rating', 'issue_tags', 'positive_tags', 'custom_remark', 'status', 'created_at', 'media', 'analysis']

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

    def get_student_email(self, obj):
        if obj.is_anonymous:
            return "Anonymous"
        return obj.student.email
