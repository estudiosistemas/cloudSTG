from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets, permissions

from .models import Notificacion
from .serializers import NotificacionSerializer, NotificacionesEnviadasSerializer, NotificacionesRecibidasSerializer


class NotificacionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

    def perform_create(self, serializer):
        serializer.save(uc=self.request.user)


class Notificaciones_Recibidas(APIView):
    #authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.AllowAny]

    def get(self, request, codigo):
        notif = Notificacion.objects.filter(user_destino=codigo, estado=True)
        data = NotificacionesRecibidasSerializer(notif, many=True).data
        return Response(data)


class Notificaciones_Enviadas(APIView):
    #authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.AllowAny]

    def get(self, request, codigo):
        notif = Notificacion.objects.filter(uc=codigo, estado=True)
        data = NotificacionesEnviadasSerializer(notif, many=True).data
        return Response(data)


# class NotificacionListWeb(APIView):
#     #permission_classes = (IsAuthenticated,)
#     permission_classes = [permissions.AllowAny]

#     def get(self, request, codigo):
#         notif = Notificacion.objects.filter(user_destino=codigo, estado=True)
#         data = NotificacionListSerializer(notif, many=True).data
#         return Response(data)
