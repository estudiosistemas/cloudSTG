from django.db import models
from bases.models import MyModel, Tipo_Documento, Condicion_IVA, Codigo_Postal
from agencias.models import Cobrador, Zona, Tarifa, Agencia


# MODELO CLIENTE
class Cliente(MyModel):
    nombre = models.CharField(max_length=150)
    tipo_documento = models.ForeignKey(
        Tipo_Documento, on_delete=models.CASCADE)
    nro_documento = models.CharField(
        max_length=11, null=True, blank=True, unique=True)
    iva = models.ForeignKey(Condicion_IVA, on_delete=models.CASCADE)
    domicilio = models.CharField(max_length=150, blank=True, null=True)
    codigo_postal = models.ForeignKey(Codigo_Postal, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(max_length=150, blank=True, null=True)
    representante = models.CharField(max_length=150, blank=True, null=True)
    seguro_propio = models.BooleanField
    seguro_propio_vencimiento = models.DateField

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.upper()
        if self.domicilio:
            self.domicilio = self.domicilio.upper()
        if self.representante:
            self.representante = self.representante.upper()
        super(Cliente, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Clientes"


class Clientes_Agencia(MyModel):
    agencia = models.ForeignKey(Agencia, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    cobrador = models.ForeignKey(Cobrador, on_delete=models.CASCADE)
    zona = models.ForeignKey(Zona, on_delete=models.CASCADE)
    tarifa = models.ForeignKey(Tarifa, on_delete=models.CASCADE)
    tarifa_bulto = models.BooleanField
    tarifa_kg = models.BooleanField
    tarifa_m3 = models.BooleanField
    tarifa_porcentaje = models.BooleanField
    cta_cte = models.BooleanField

    def __str__(self):
        return "{} {}".format(self.agencia, self.cliente)

    class Meta:
        unique_together = (("agencia", "cliente"),)
        verbose_name_plural = "Clientes por Agencia"
