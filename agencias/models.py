from django.db import models
from bases.models import MyModel, Codigo_Postal, Comprobante, Empresa

from PIL import Image


# MODELO Agencias
class Agencia(MyModel):
    nombre = models.CharField(max_length=150)
    domicilio = models.CharField(max_length=150)
    codigo_postal = models.ForeignKey(
        Codigo_Postal,
        on_delete=models.CASCADE,
        related_name='codpostal'
    )
    telefono = models.CharField(max_length=150)
    porcentaje = models.FloatField(default=0)
    porcentaje_Bs_As = models.FloatField(default=0)
    logo = models.ImageField(upload_to='logo_pics')
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    localidades = models.ManyToManyField(Codigo_Postal)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self):
        self.nombre = self.nombre.upper()
        super(Agencia, self).save()

    class Meta:
        verbose_name_plural = "Agencias"
        ordering = ('nombre',)


CONCEPTO_CHOICES = (
    (1, 'Servicios'),
    (2, 'Productos'),
    (3, 'Productos y Servicios')
)

# Punto de Venta


class Punto_Venta(MyModel):

    agencia = models.ForeignKey(Agencia, on_delete=models.CASCADE)
    punto_venta = models.IntegerField(default=1)
    descripcion = models.CharField(max_length=100, null=False, blank=False)
    concepto = models.IntegerField(choices=CONCEPTO_CHOICES)

    def __str__(self):
        return "Agencia: {0} - Pto. Venta: {1:0>5}".format(self.agencia, self.punto_venta)

    class Meta:
        verbose_name_plural = "Puntos Venta"


class Comprobante_PtoVenta(MyModel):
    punto_venta = models.ForeignKey(Punto_Venta, on_delete=models.CASCADE)
    comprobante = models.ForeignKey(Comprobante, on_delete=models.CASCADE)
    numero = models.IntegerField(default=1)

    def __str__(self):
        return "{0} - Comprobante: {1}".format(self.punto_venta, self.comprobante)

    class Meta:
        verbose_name_plural = "Puntos de Venta por Comprobante"


# MODELO Cobrador


class Cobrador(MyModel):
    agencia = models.ForeignKey(Agencia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    domicilio = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=100, null=True, blank=True)
    comision = models.DecimalField(max_digits=4, decimal_places=2, default=0)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        if self.nombre:
            self.nombre = self.nombre.upper()
        if self.domicilio:
            self.domicilio = self.domicilio.upper()
        super(Cobrador, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Cobradores"


class Tarifa(MyModel):
    agencia = models.ForeignKey(Agencia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        if self.nombre:
            self.nombre = self.nombre.upper()
        super(Tarifa, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Tarifas"


class Zona(MyModel):
    agencia = models.ForeignKey(Agencia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        if self.nombre:
            self.nombre = self.nombre.upper()
        super(Zona, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Zonas"
