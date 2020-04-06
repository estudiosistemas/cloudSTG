from .models import Cliente, Clientes_Agencia
from .serializers import ClienteSerializer, Clientes_AgenciaSerializer
from bases.api import GetPermisionViewSet

from rest_framework import viewsets, permissions, generics


class ClienteViewSet(GetPermisionViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all().order_by('nombre')


class Clientes_AgenciaViewSet(GetPermisionViewSet):
    serializer_class = Clientes_AgenciaSerializer
    queryset = Clientes_Agencia.objects.all()


class ClientesAgencia(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = Clientes_AgenciaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        cli = self.kwargs['cliente']
        return Clientes_Agencia.objects.filter(agencia=agen, cliente=cli)
