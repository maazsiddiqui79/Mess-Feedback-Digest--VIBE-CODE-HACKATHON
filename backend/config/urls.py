from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # To be added in later phases:
    path('api/auth/', include('accounts.urls')),
    path('api/meals/', include('meals.urls')),
    path('api/feedback/', include('feedback.urls')),
    path('api/community/', include('community.urls')),
    # path('api/ai/', include('ai_engine.urls')),
    path('api/analytics/', include('analytics.urls')),
]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
