from rest_framework import serializers


class FacturaSerializer(serializers.Serializer):
    puntoventa = serializers.IntegerField(write_only=True)
    comprobante_afip = serializers.IntegerField(write_only=True)
    cliente = serializers.IntegerField(write_only=True)
