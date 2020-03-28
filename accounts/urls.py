from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, ProfileViewSet, UserListView
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/user/list', UserListView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
