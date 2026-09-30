from django.db import models
from django.conf import settings
from meals.models import Meal

class Feedback(models.Model):
    STATUS_CHOICES = [
        ('PENDING_ANALYSIS', 'Pending Analysis'),
        ('ANALYZED', 'Analyzed'),
        ('FAILED', 'Failed Analysis'),
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name='feedbacks')
    rating = models.IntegerField() # 1 to 5
    issue_tags = models.JSONField(default=list, blank=True)
    positive_tags = models.JSONField(default=list, blank=True)
    custom_remark = models.TextField(blank=True)
    is_anonymous = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING_ANALYSIS')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Feedback {self.id} for {self.meal}"

    class Meta:
        ordering = ['-created_at']

class FeedbackMedia(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('IMAGE', 'Image'),
        ('VIDEO', 'Video'),
        ('AUDIO', 'Audio'),
    ]

    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name='media')
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to='feedback_media/')
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.media_type} for Feedback {self.feedback_id}"
