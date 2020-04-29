from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include('bases.urls')),
    path('', include('agencias.urls')),
    path('', include('clientes.urls')),
    path('', include('factura.urls')),
    path('', include('notificaciones.urls')),
]
