from django.db import models
from feedback.models import Feedback

class FeedbackAnalysis(models.Model):
    SENTIMENT_CHOICES = [
        ('POSITIVE', 'Positive'),
        ('NEUTRAL', 'Neutral'),
        ('NEGATIVE', 'Negative'),
        ('MIXED', 'Mixed'),
    ]

    SEVERITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    ]

    MODERATION_CHOICES = [
        ('ALLOW', 'Allow'),
        ('REVIEW', 'Review'),
        ('BLOCK', 'Block'),
    ]

    feedback = models.OneToOneField(Feedback, on_delete=models.CASCADE, related_name='analysis')
    language = models.CharField(max_length=20, blank=True)
    transcript = models.TextField(blank=True)
    sentiment = models.CharField(max_length=20, choices=SENTIMENT_CHOICES, blank=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, blank=True)
    themes = models.JSONField(default=list, blank=True)
    summary = models.TextField(blank=True)
    duplicate_score = models.FloatField(null=True, blank=True)
    ai_confidence = models.FloatField(null=True, blank=True)
    moderation_status = models.CharField(max_length=20, choices=MODERATION_CHOICES, default='ALLOW')
    provider = models.CharField(max_length=50, blank=True)
    model = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Analysis for Feedback {self.feedback_id}"

class AIInsight(models.Model):
    insight_type = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    summary = models.TextField()
    evidence = models.JSONField(default=dict)
    severity = models.CharField(max_length=20)
    confidence = models.FloatField(null=True, blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.insight_type} - {self.date}"

class DailyDigest(models.Model):
    date = models.DateField(unique=True)
    overview = models.TextField()
    response_count = models.IntegerField(default=0)
    average_rating = models.FloatField(default=0.0)
    positive_signals = models.JSONField(default=list, blank=True)
    top_issues = models.JSONField(default=list, blank=True)
    recommendations = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Daily Digest - {self.date}"
