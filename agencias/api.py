from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import Agencias_UserSerializer, CobradorSerializer, TarifaSerializer, ZonaSerializer, AgenciaSerializer, ImgAgenciaUpdateSerializer, PuntoVentaSerializer, Comprobante_PtoVentaSerializer
from .models import Cobrador, Tarifa, Zona, Agencia, Comprobante_PtoVenta, CONCEPTO_CHOICES, Punto_Venta, Comprobante_PtoVenta
from accounts.models import Profile
from bases.api import GetPermisionViewSet, GetPermissionAPIView, GetPermissionListAPIView
from rest_framework.views import APIView
from rest_framework import viewsets, permissions


class ConceptoComprobanteAPIView(GetPermissionAPIView):
    def get(self, request):
        return Response(CONCEPTO_CHOICES)


class Comprobante_PtoVenta_Agencia(GetPermissionListAPIView):
    serializer_class = Comprobante_PtoVentaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Comprobante_PtoVenta.objects.filter(punto_venta__agencia=agen).order_by('punto_venta')


class Comprobante_PtoVentaViewSet(GetPermisionViewSet):
    serializer_class = Comprobante_PtoVentaSerializer
    queryset = Comprobante_PtoVenta.objects.all().order_by('punto_venta')


class PuntoVentaViewSet(GetPermisionViewSet):
    serializer_class = PuntoVentaSerializer
    queryset = Punto_Venta.objects.all().order_by('punto_venta')


class PuntoVenta_Agencia(GetPermissionListAPIView):
    serializer_class = PuntoVentaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Punto_Venta.objects.filter(agencia=agen)


class Agencias_User(GetPermissionAPIView):

    def get(self, request, codigo):
        agen = get_object_or_404(Profile, user_id=codigo)
        data = Agencias_UserSerializer(agen).data
        return Response(data)


class AgenciaViewSet(GetPermisionViewSet):
    serializer_class = AgenciaSerializer
    queryset = Agencia.objects.all()


class ImgAgenciaUpdateViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ImgAgenciaUpdateSerializer
    queryset = Agencia.objects.all()


class CobradorViewSet(GetPermisionViewSet):
    serializer_class = CobradorSerializer
    queryset = Cobrador.objects.all().order_by('nombre')


class Cobrador_Agencia(GetPermissionListAPIView):
    serializer_class = CobradorSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Cobrador.objects.filter(agencia=agen)


class TarifaViewSet(GetPermisionViewSet):
    serializer_class = TarifaSerializer
    queryset = Tarifa.objects.all().order_by('nombre')


class Tarifa_Agencia(GetPermissionListAPIView):
    serializer_class = TarifaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Tarifa.objects.filter(agencia=agen)


class ZonaViewSet(GetPermisionViewSet):
    serializer_class = ZonaSerializer
    queryset = Zona.objects.all().order_by('nombre')


class Zona_Agencia(GetPermissionListAPIView):
    serializer_class = ZonaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Zona.objects.filter(agencia=agen)
