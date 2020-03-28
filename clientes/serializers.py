from rest_framework import serializers
from .models import Cliente, Clientes_Agencia
from bases.serializers import TipoDocumentoSerializer, CondicionIVASerializer, CodigoPostalSerializer


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['tipo_documento'] = TipoDocumentoSerializer(read_only=True)
        self.fields['iva'] = CondicionIVASerializer(read_only=True)
        self.fields['codigo_postal'] = CodigoPostalSerializer(read_only=True)
        return super(ClienteSerializer, self).to_representation(instance)
