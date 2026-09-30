from django.urls import path
from .views import CommunityPostListCreateView, CommunityPostDeleteView, CommunityMediaUploadView

urlpatterns = [
    path('', CommunityPostListCreateView.as_view(), name='community-list-create'),
    path('<int:pk>/', CommunityPostDeleteView.as_view(), name='community-delete'),
    path('<int:pk>/media/', CommunityMediaUploadView.as_view(), name='community-media'),
]
