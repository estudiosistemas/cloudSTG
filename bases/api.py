from .models import Provincia, Alicuota_IVA, Codigo_Postal, Condicion_IVA, Tipo_Documento, Comprobante, TIPO_COMPROBANTE_CHOICES
from .serializers import ProvinciaSerializer, AlicuotaIVASerializer, CodigoPostalSerializer, CondicionIVASerializer, TipoDocumentoSerializer, ComprobanteSerializer
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class GetPermissionAPIView(APIView):
    def get_permissions(self):
        permission_classes = [permissions.AllowAny]

        # if self.action == 'list':
        #     permission_classes = [permissions.IsAuthenticated]
        # else:
        #     permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]


class GetPermisionViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        permission_classes = [permissions.AllowAny]

        # if self.action == 'list':
        #     permission_classes = [permissions.IsAuthenticated]
        # else:
        #     permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]


class TipoComprobanteChoiceAPIView(GetPermissionAPIView):
    def get(self, request):
        return Response(TIPO_COMPROBANTE_CHOICES)


class ComprobanteViewSet(GetPermisionViewSet):
    serializer_class = ComprobanteSerializer
    queryset = Comprobante.objects.all()


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
