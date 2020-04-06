from rest_framework import serializers
from .models import Cliente, Clientes_Agencia
from bases.serializers import TipoDocumentoSerializer, CondicionIVASerializer, CodigoPostalSerializer
from agencias.serializers import ZonaSerializer, TarifaSerializer, CobradorSerializer


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['tipo_documento'] = TipoDocumentoSerializer(read_only=True)
        self.fields['iva'] = CondicionIVASerializer(read_only=True)
        self.fields['codigo_postal'] = CodigoPostalSerializer(read_only=True)
        return super(ClienteSerializer, self).to_representation(instance)


class Clientes_AgenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes_Agencia
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['cobrador'] = CobradorSerializer(read_only=True)
        self.fields['zona'] = ZonaSerializer(read_only=True)
        self.fields['tarifa'] = TarifaSerializer(read_only=True)
        return super(Clientes_AgenciaSerializer, self).to_representation(instance)
