from django.contrib import admin
from .models import Provincia, Alicuota_IVA, Codigo_Postal, Empresa, Comprobante, Tipo_Documento, Condicion_IVA

admin.site.register(Provincia)
admin.site.register(Alicuota_IVA)
admin.site.register(Codigo_Postal)
admin.site.register(Empresa)
admin.site.register(Comprobante)
admin.site.register(Tipo_Documento)
admin.site.register(Condicion_IVA)
