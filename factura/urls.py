from django.urls import path, include
from rest_framework import routers
from .api import FacturaAPIView

router = routers.DefaultRouter()
#router.register('api/factura', FacturaViewSet, 'factura')

urlpatterns = [
    path('api/facturar', FacturaAPIView.as_view(), name='facturar'),
    #path('', include(router.urls)),
]
