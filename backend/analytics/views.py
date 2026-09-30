from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Avg, Count
from django.utils import timezone
from datetime import timedelta
from feedback.models import Feedback
from ai_engine.models import DailyDigest
from ai_engine.tasks import generate_daily_digest_task
from .serializers import DashboardFeedbackSerializer, DailyDigestSerializer
import threading
from accounts.permissions import IsAdminUserRole, IsManager

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated, (IsManager | IsAdminUserRole)]

    def get(self, request):
        today = timezone.now().date()
        recent_feedbacks = Feedback.objects.filter(created_at__date=today)
        
        total_today = recent_feedbacks.count()
        avg_rating = recent_feedbacks.aggregate(Avg('rating'))['rating__avg'] or 0.0
        
        from ai_engine.models import FeedbackAnalysis
        crit_analysis_ids = set(FeedbackAnalysis.objects.filter(feedback__created_at__date=today, severity='CRITICAL').values_list('feedback_id', flat=True))
        crit_rating_ids = set(recent_feedbacks.filter(rating=1).values_list('id', flat=True))
        critical_issues = len(crit_analysis_ids.union(crit_rating_ids))

        # Latest 10 feedbacks
        latest_feedbacks = Feedback.objects.select_related('student', 'meal').order_by('-created_at')[:10]
        serialized_feedbacks = DashboardFeedbackSerializer(latest_feedbacks, many=True).data

        # Rating Distribution for Graph
        distribution = []
        for r in range(1, 6):
            distribution.append({
                "name": f"{r} Stars",
                "count": recent_feedbacks.filter(rating=r).count()
            })

        return Response({
            "total_today": total_today,
            "avg_rating": round(avg_rating, 1),
            "critical_issues": critical_issues,
            "recent_feedbacks": serialized_feedbacks,
            "rating_distribution": distribution
        })

from rest_framework import generics

class DailyDigestListView(generics.ListAPIView):
    queryset = DailyDigest.objects.all().order_by('-date')
    serializer_class = DailyDigestSerializer
    permission_classes = [permissions.IsAuthenticated, (IsManager | IsAdminUserRole)]

class TriggerDigestView(APIView):
    permission_classes = [permissions.IsAuthenticated, (IsManager | IsAdminUserRole)]

    def post(self, request):
        thread = threading.Thread(target=generate_daily_digest_task)
        thread.start()
        return Response({"status": "Digest generation started in the background."})
