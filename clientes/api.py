from .models import Cliente, Clientes_Agencia
from .serializers import ClienteSerializer
from bases.api import GetPermisionViewSet

from rest_framework import viewsets, permissions


class ClienteViewSet(GetPermisionViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all().order_by('nombre')
