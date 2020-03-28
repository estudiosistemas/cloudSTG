from rest_framework import serializers
from .models import Provincia, Alicuota_IVA, Codigo_Postal, Condicion_IVA, Tipo_Documento


class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = '__all__'


class AlicuotaIVASerializer(serializers.ModelSerializer):
    class Meta:
        model = Alicuota_IVA
        fields = '__all__'


class CondicionIVASerializer(serializers.ModelSerializer):
    class Meta:
        model = Condicion_IVA
        fields = '__all__'


class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo_Documento
        fields = '__all__'


class CodigoPostalSerializer(serializers.ModelSerializer):
    provincia = ProvinciaSerializer(many=False, read_only=True)
    provincia_codigo = serializers.CharField(write_only=True)

    class Meta:
        model = Codigo_Postal
        fields = ["codigo", "localidad", "provincia", "provincia_codigo"]

    def create(self, validated_data):
        cod = validated_data['codigo']
        loc = validated_data['localidad']
        prov = Provincia.objects.get(pk=validated_data['provincia_codigo'])

        return Codigo_Postal.objects.create(codigo=cod, localidad=loc, provincia=prov)

    def update(self, instance, validated_data):
        instance.codigo = validated_data['codigo']
        instance.localidad = validated_data['localidad']
        instance.provincia = Provincia.objects.get(
            pk=validated_data['provincia_codigo'])
        instance.save()
        return instance
    # def to_representation(self, instance):
    #     self.fields['provincia'] = ProvinciaSerializer(read_only=True)
    #     return super(CodigoPostalSerializer, self).to_representation(instance)
