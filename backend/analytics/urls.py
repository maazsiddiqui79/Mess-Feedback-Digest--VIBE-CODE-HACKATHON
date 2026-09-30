from django.urls import path
from .views import DashboardStatsView, DailyDigestListView, TriggerDigestView

urlpatterns = [
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('digests/', DailyDigestListView.as_view(), name='digest-list'),
    path('digests/generate/', TriggerDigestView.as_view(), name='digest-generate'),
]
