from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notificacion


class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'

    # def create(self, request, validated_data):
    #     notificacion = Notificacion.objects.create(
    #         uc=request.user, **validated_data)
    #     return notificacion


class UserCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class NotificacionesRecibidasSerializer(serializers.ModelSerializer):
    uc = UserCreatorSerializer(many=False, read_only=True)
    avatar = serializers.SerializerMethodField('get_avatar')
    userfrom = serializers.SerializerMethodField('get_userfrom')

    class Meta:
        model = Notificacion
        fields = ('id', 'estado', 'leida', 'fc', 'asunto', 'mensaje',
                  'prioridad', 'user_destino', 'uc', 'userfrom', 'avatar')

    def get_avatar(self, notificacion):
        avatar = notificacion.uc.profile.image.url
        return avatar

    def get_userfrom(self, notificacion):
        userfrom = notificacion.uc.first_name + " " + notificacion.uc.last_name
        return userfrom


class NotificacionesEnviadasSerializer(serializers.ModelSerializer):
    user_destino = UserCreatorSerializer(many=False, read_only=True)
    avatar = serializers.SerializerMethodField('get_avatar')
    userTo = serializers.SerializerMethodField('get_userto')

    class Meta:
        model = Notificacion
        fields = ('id', 'estado', 'leida', 'fc', 'asunto', 'mensaje',
                  'prioridad', 'user_destino', 'userTo', 'uc', 'avatar')

    def get_avatar(self, notificacion):
        avatar = notificacion.user_destino.profile.image.url
        return avatar

    def get_userto(self, notificacion):
        userTo = notificacion.user_destino.first_name + \
            " " + notificacion.user_destino.last_name
        return userTo
