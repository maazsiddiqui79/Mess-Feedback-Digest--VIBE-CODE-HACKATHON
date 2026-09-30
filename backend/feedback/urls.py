from django.urls import path
from .views import FeedbackCreateView, FeedbackMediaUploadView, FeedbackListView

urlpatterns = [
    path('', FeedbackListView.as_view(), name='feedback-list'),
    path('create/', FeedbackCreateView.as_view(), name='feedback-create'),
    path('<int:pk>/media/', FeedbackMediaUploadView.as_view(), name='feedback-media'),
]
