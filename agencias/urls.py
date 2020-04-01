from django.urls import path, include
from rest_framework import routers
from .api import Agencias_User, Cobrador_Agencia, Tarifa_Agencia, Zona_Agencia, CobradorViewSet

router = routers.DefaultRouter()
router.register('api/cobradores', CobradorViewSet, 'cobradores')

urlpatterns = [
    path('api/auth/agenciasusuario/<str:codigo>',
         Agencias_User.as_view(), name='agencias_usuario'),
    path('api/cobrador-agencia/<str:agencia>',
         Cobrador_Agencia.as_view(), name='cobrador_agencia'),
    path('api/tarifa-agencia/<str:agencia>',
         Tarifa_Agencia.as_view(), name='tarifa_agencia'),
    path('api/zona-agencia/<str:agencia>',
         Zona_Agencia.as_view(), name='zona_agencia'),
    path('', include(router.urls)),

]
