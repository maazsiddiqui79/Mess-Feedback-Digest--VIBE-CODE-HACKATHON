from rest_framework import generics, permissions
from django.utils import timezone
from .models import Meal
from .serializers import MealSerializer
from accounts.permissions import IsStudent

class IsManagerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['MANAGER', 'ADMIN', 'SUPER_ADMIN']

class TodayMealsView(generics.ListAPIView):
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Meal.objects.filter(is_active=True).order_by('date', 'start_time')

class ManagerMealListCreateView(generics.ListCreateAPIView):
    serializer_class = MealSerializer
    permission_classes = [IsManagerOrAdmin]
    
    def get_queryset(self):
        return Meal.objects.all().order_by('-date', '-start_time')

class ManagerMealDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MealSerializer
    permission_classes = [IsManagerOrAdmin]
    queryset = Meal.objects.all()
