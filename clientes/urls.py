from rest_framework import routers
from django.urls import path, include
from .api import ClienteViewSet, Clientes_AgenciaViewSet, ClientesAgencia

router = routers.DefaultRouter()
router.register('api/clientes', ClienteViewSet, 'clientes')
router.register('api/clientes-agencia',
                Clientes_AgenciaViewSet, 'clientes_agencia')

urlpatterns = [
    path('api/clientesagencia/<str:agencia>/<str:cliente>',
         ClientesAgencia.as_view(), name='clientesagencias_lista'),
    path('', include(router.urls)),

]
