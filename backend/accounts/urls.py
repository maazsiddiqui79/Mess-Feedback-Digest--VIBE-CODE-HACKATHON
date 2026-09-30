from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import (
    RegisterView, LogoutView, UserProfileView,
    StudentProfileUpdateView, StudentProfileListView,
    AdminUserListView, AdminUserDetailView, AdminCreateManagerView
)

urlpatterns = [
    # Auth
    path('register/',         RegisterView.as_view(),       name='register'),
    path('login/',            TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/',    TokenRefreshView.as_view(),   name='token_refresh'),
    path('logout/',           LogoutView.as_view(),         name='logout'),

    # Student
    path('me/',               UserProfileView.as_view(),    name='user_profile'),
    path('profile/',          StudentProfileUpdateView.as_view(), name='profile_update'),
    path('profiles/',         StudentProfileListView.as_view(),   name='profile_list'),

    # Admin
    path('admin/users/',                  AdminUserListView.as_view(),     name='admin_user_list'),
    path('admin/users/<int:pk>/',         AdminUserDetailView.as_view(),   name='admin_user_detail'),
    path('admin/create-manager/',         AdminCreateManagerView.as_view(), name='admin_create_manager'),
]
