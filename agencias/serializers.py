from rest_framework import serializers
from .models import Agencia, Cobrador, Tarifa, Zona, CONCEPTO_CHOICES, Comprobante_PtoVenta
from bases.serializers import CodigoPostalSerializer
from accounts.models import Profile


# class ConceptoComprobanteSerializer(serializers.ListSerializer):
#     concepto = serializers.ChoiceField(
#         choices=CONCEPTO_CHOICES)

# class Meta:
#    model = Comprobante_PtoVenta


class AgenciaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agencia
        #fields = '__all__'
        exclude = ['logo']


class ImgAgenciaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agencia
        fields = ('logo',)

    def update(self, instance, validated_data):
        instance.logo = validated_data['logo']
        instance.save()
        return instance


class Agencias_UserSerializer(serializers.ModelSerializer):
    #agencias_list = AgenciaSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['agencias']
        depth = 3


class CobradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cobrador
        fields = '__all__'


class TarifaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifa
        fields = '__all__'


class ZonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zona
        fields = '__all__'
