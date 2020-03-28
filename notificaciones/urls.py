from rest_framework import routers
from django.urls import path, include
from .api import NotificacionViewSet, Notificaciones_Recibidas, Notificaciones_Enviadas

router = routers.DefaultRouter()
router.register('api/notificaciones', NotificacionViewSet, 'notificaciones')

urlpatterns = [
    path('api/notify-rec/<str:codigo>', Notificaciones_Recibidas.as_view(),
         name='notificaciones_recibidas'),
    path('api/notify-send/<str:codigo>', Notificaciones_Enviadas.as_view(),
         name='notificaciones_enviadas'),
    path('', include(router.urls)),
]
