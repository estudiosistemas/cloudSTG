from django.db import models
from django.contrib.auth.models import User
from django_userforeignkey.models.fields import UserForeignKey
from PIL import Image

# Clase Modelo para todos los modelos


class MyModel(models.Model):
    estado = models.BooleanField(default=True)
    fc = models.DateTimeField(auto_now_add=True)
    fm = models.DateTimeField(auto_now=True)
    uc = UserForeignKey(auto_user_add=True, related_name="+")
    um = UserForeignKey(auto_user=True, related_name="+")

    class Meta:
        abstract = True


# MODELO PROVINCIAS
class Provincia(models.Model):
    codigo = models.CharField(max_length=1, primary_key=True, unique=True)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        self.codigo = self.codigo.upper()
        self.nombre = self.nombre.upper()
        super(Provincia, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Provincias"


# MODELO COD_POSTALES
class Codigo_Postal(models.Model):
    codigo = models.CharField(max_length=4,  primary_key=True, unique=True)
    localidad = models.CharField(max_length=100)
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE)

    def __str__(self):
        return '{} ({})'.format(self.localidad, self.provincia)

    def save(self, *args, **kwargs):
        self.localidad = self.localidad.upper()
        super(Codigo_Postal, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Códigos Postales"


class Alicuota_IVA(models.Model):
    nombre = models.CharField(max_length=20, null=False)
    tasa = models.FloatField(null=False)
    codigo_Afip = models.CharField(max_length=4, null=False)

    def __str__(self):
        #frmt_codigo_afip = "{0:0>4}".format(self.codigo_Afip)
        return '{}'.format(self.nombre)

    class Meta:
        verbose_name_plural = "Alícuotas IVA"


# MODELO Condiciones de IVA
class Condicion_IVA(models.Model):
    codigo_afip = models.IntegerField(null=True, blank=True)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.upper()
        super(Condicion_IVA, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Iva"


class Tipo_Documento(models.Model):
    codigo = models.IntegerField(primary_key=True, unique=True, null=False)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        self.nombre = self.nombre.upper()
        super(Tipo_Documento, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Tipos de Documentos"


TIPO_COMPROBANTE_CHOICES = [
    ('D', 'Débito'),
    ('C', 'Crédito'),
    ('N', 'No determinado'),
]


class Comprobante(MyModel):
    codigo_AFIP = models.CharField(max_length=3, null=True, blank=True)
    descripcion = models.CharField(max_length=100)
    tipo_comprobante = models.CharField(
        max_length=1, choices=TIPO_COMPROBANTE_CHOICES)
    es_sistema = models.BooleanField(default=False)

    def __str__(self):
        return '{}'.format(self.descripcion)

    def save(self, *args, **kwargs):
        self.descripcion = self.descripcion.upper()
        super(Comprobante, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Comprobantes"


# MODELO EMPRESA
class Empresa(MyModel):
    nombre = models.CharField(max_length=150)
    domicilio = models.CharField(max_length=150, null=True, blank=True)
    codigo_postal = models.ForeignKey(Codigo_Postal, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=150, null=True, blank=True)
    iva = models.ForeignKey(Condicion_IVA, on_delete=models.CASCADE)
    cuit = models.CharField(max_length=11, null=True, blank=True)
    inicio_actividades = models.DateField(null=True, blank=True)
    iibb = models.CharField(max_length=50, null=True, blank=True)
    logo = models.ImageField(upload_to='logo_pics', null=True, blank=True)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self, *args, **kwargs):
        if self.nombre:
            self.nombre = self.nombre.upper()
        if self.domicilio:
            self.domicilio = self.domicilio.upper()
        super(Empresa, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Empresas"
