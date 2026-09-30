from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserSerializer, RegisterSerializer, StudentProfileSerializer,
    UserAdminSerializer, CreateManagerSerializer
)
from .models import User, StudentProfile


# ── Auth ──────────────────────────────────────────────────────
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# ── Student: own profile ──────────────────────────────────────
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class StudentProfileUpdateView(generics.RetrieveUpdateAPIView):
    """GET / PATCH  /api/accounts/profile/"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudentProfileSerializer

    def get_object(self):
        profile, _ = StudentProfile.objects.get_or_create(
            user=self.request.user,
            defaults={'student_id': f"STU{User.objects.count():04d}"}
        )
        return profile


class StudentProfileListView(generics.ListAPIView):
    """GET  /api/accounts/profiles/"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudentProfileSerializer
    queryset = StudentProfile.objects.select_related('user').all()


# ── Admin: user management ────────────────────────────────────
class IsAdminOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and (
                request.user.role in ['ADMIN', 'SUPER_ADMIN'] or 
                request.user.is_superuser or 
                request.user.is_staff
            )
        )


class AdminUserListView(generics.ListAPIView):
    """GET  /api/accounts/admin/users/"""
    permission_classes = [IsAdminOrSuperAdmin]
    serializer_class = UserAdminSerializer
    queryset = User.objects.all().order_by('-created_at')


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET / PATCH / DELETE  /api/accounts/admin/users/<pk>/"""
    permission_classes = [IsAdminOrSuperAdmin]
    serializer_class = UserAdminSerializer
    queryset = User.objects.all()


class AdminCreateManagerView(generics.CreateAPIView):
    """POST  /api/accounts/admin/create-manager/"""
    permission_classes = [IsAdminOrSuperAdmin]
    serializer_class = CreateManagerSerializer
