from django.urls import path
from .views import TodayMealsView, ManagerMealListCreateView, ManagerMealDetailView

urlpatterns = [
    path('today/', TodayMealsView.as_view(), name='meals-today'),
    path('manager/', ManagerMealListCreateView.as_view(), name='manager-meals-list'),
    path('manager/<int:pk>/', ManagerMealDetailView.as_view(), name='manager-meals-detail'),
]
