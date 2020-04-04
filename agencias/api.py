from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import Agencias_UserSerializer, CobradorSerializer, TarifaSerializer, ZonaSerializer
from .models import Cobrador, Tarifa, Zona
from accounts.models import Profile
from bases.api import GetPermisionViewSet
from rest_framework.views import APIView
from rest_framework import viewsets, permissions


class Agencias_User(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, codigo):
        agen = get_object_or_404(Profile, user_id=codigo)
        data = Agencias_UserSerializer(agen).data
        return Response(data)


class CobradorViewSet(GetPermisionViewSet):
    serializer_class = CobradorSerializer
    queryset = Cobrador.objects.all().order_by('nombre')


class Cobrador_Agencia(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CobradorSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Cobrador.objects.filter(agencia=agen)


class TarifaViewSet(GetPermisionViewSet):
    serializer_class = TarifaSerializer
    queryset = Tarifa.objects.all().order_by('nombre')


class Tarifa_Agencia(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TarifaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Tarifa.objects.filter(agencia=agen)


class ZonaViewSet(GetPermisionViewSet):
    serializer_class = ZonaSerializer
    queryset = Zona.objects.all().order_by('nombre')


class Zona_Agencia(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ZonaSerializer

    def get_queryset(self):
        agen = self.kwargs['agencia']
        return Zona.objects.filter(agencia=agen)
