"""
URL configuration for restraunt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import RedirectView
from api.views import (
    CategoryViewSet, ReservationViewSet, MenuItemViewSet, 
    OrderViewSet, SiteSettingsViewSet, HeroSlideViewSet, GalleryImageViewSet, GoogleLogin
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static





router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'menu-items', MenuItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'settings', SiteSettingsViewSet)
router.register(r'hero-slides', HeroSlideViewSet)
router.register(r'gallery', GalleryImageViewSet)


urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name ='token_refresh'),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/google/', GoogleLogin.as_view(), name='google_login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
