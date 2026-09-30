from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CommunityPost, CommunityMedia
from .serializers import CommunityPostSerializer, CommunityMediaSerializer

class CommunityPostListCreateView(generics.ListCreateAPIView):
    queryset = CommunityPost.objects.filter(status='ACTIVE').order_by('-created_at')
    serializer_class = CommunityPostSerializer
    permission_classes = [permissions.IsAuthenticated]

class CommunityPostDeleteView(generics.DestroyAPIView):
    queryset = CommunityPost.objects.all()
    serializer_class = CommunityPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        # Allow deletion if author or manager
        if self.request.user == instance.author or self.request.user.role in ['MANAGER', 'ADMIN', 'SUPER_ADMIN']:
            instance.status = 'DELETED'
            instance.save()

class CommunityMediaUploadView(generics.CreateAPIView):
    serializer_class = CommunityMediaSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        post_id = self.kwargs.get('pk')
        post = CommunityPost.objects.get(id=post_id, author=self.request.user)
        serializer.save(post=post)
