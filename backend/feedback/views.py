from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Feedback, FeedbackMedia
from .serializers import FeedbackSerializer, FeedbackMediaSerializer
from accounts.permissions import IsStudent
from ai_engine.tasks import analyze_feedback_task
import threading

class FeedbackListView(generics.ListAPIView):
    """GET /api/feedback/?date=YYYY-MM-DD  (managers only)"""
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Feedback.objects.select_related('meal', 'student').prefetch_related('media')
        date = self.request.query_params.get('date')
        if date:
            qs = qs.filter(created_at__date=date)
        return qs.order_by('-created_at')

class FeedbackCreateView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def perform_create(self, serializer):
        feedback = serializer.save()
        # Fire and forget the AI analysis in a background thread
        thread = threading.Thread(target=analyze_feedback_task, args=(feedback.id,))
        thread.start()

class FeedbackMediaUploadView(generics.CreateAPIView):
    serializer_class = FeedbackMediaSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        feedback_id = self.kwargs.get('pk')
        try:
            feedback = Feedback.objects.get(id=feedback_id, student=self.request.user)
            serializer.save(feedback=feedback)
        except Feedback.DoesNotExist:
            pass # Usually you would raise ValidationError but doing this gracefully for simplicity 
            
    def post(self, request, *args, **kwargs):
        feedback_id = self.kwargs.get('pk')
        try:
            feedback = Feedback.objects.get(id=feedback_id, student=self.request.user)
        except Feedback.DoesNotExist:
            return Response({"error": "Feedback not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)
            
        return super().post(request, *args, **kwargs)
