from bases.models import Provincia, Alicuota_IVA, Codigo_Postal, Condicion_IVA, Tipo_Documento
from bases.serializers import ProvinciaSerializer, AlicuotaIVASerializer, CodigoPostalSerializer, CondicionIVASerializer, TipoDocumentoSerializer
from rest_framework import viewsets, permissions


class GetPermisionViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        permission_classes = [permissions.AllowAny]

        # if self.action == 'list':
        #     permission_classes = [permissions.IsAuthenticated]
        # else:
        #     permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]


class ProvinciaViewSet(GetPermisionViewSet):
    serializer_class = ProvinciaSerializer
    queryset = Provincia.objects.all().order_by('nombre')


class AlicuotaIVAViewSet(GetPermisionViewSet):
    serializer_class = AlicuotaIVASerializer
    queryset = Alicuota_IVA.objects.all()


class CondicionIVAViewSet(GetPermisionViewSet):
    serializer_class = CondicionIVASerializer
    queryset = Condicion_IVA.objects.all()


class CodigoPostalViewSet(GetPermisionViewSet):
    serializer_class = CodigoPostalSerializer
    queryset = Codigo_Postal.objects.all()


class TipoDocumentoViewSet(GetPermisionViewSet):
    serializer_class = TipoDocumentoSerializer
    queryset = Tipo_Documento.objects.all()
