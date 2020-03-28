from django.contrib import admin
from .models import Agencia, Zona, Tarifa, Cobrador, Comprobante_PtoVenta

# Register your models here.
admin.site.register(Agencia)
admin.site.register(Zona)
admin.site.register(Tarifa)
admin.site.register(Cobrador)
