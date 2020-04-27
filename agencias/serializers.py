from rest_framework import serializers
from .models import Agencia, Cobrador, Tarifa, Zona, CONCEPTO_CHOICES, Comprobante_PtoVenta, Punto_Venta
from bases.serializers import DefaultModelSerializer, CodigoPostalSerializer, Comprobante
from accounts.models import Profile


class PuntoVentaSerializer(DefaultModelSerializer):
    class Meta:
        model = Punto_Venta
        fields = '__all__'

    def create(self, validated_data):
        # Grabo el comprobante
        ptoventa = Punto_Venta(**validated_data)
        ptoventa.save()
        # Recorro los comprobantes y grabo en PuntoVenta_Comprobante
        comprobantes = Comprobante.objects.all()
        for comprobante in comprobantes:
            Comprobante_PtoVenta.objects.create(
                punto_venta=ptoventa, comprobante=comprobante, numero=1)
        return ptoventa

    def update(self, instance, validated_data):
        instance.punto_venta = validated_data['punto_venta']
        instance.descripcion = validated_data['descripcion']
        instance.concepto = validated_data['concepto']
        instance.estado = validated_data['estado']
        estado = validated_data['estado']
        instance.save()
        ptoventa = Punto_Venta.objects.get(pk=instance.id)
        # Para todos los comprobantes en el pto venta seleccionado, actualizo el estado
        Comprobante_PtoVenta.objects.filter(punto_venta=ptoventa).update(
            estado=estado)
        return instance


class Comprobante_PtoVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comprobante_PtoVenta
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['punto_venta'] = PuntoVentaSerializer(read_only=True)
        return super(Comprobante_PtoVentaSerializer, self).to_representation(instance)


class AgenciaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agencia
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
