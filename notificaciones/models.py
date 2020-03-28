from django.db import models
from django.contrib.auth.models import User
from bases.models import MyModel


# MODELO NOTIFICACIONES
class Notificacion(MyModel):
    PRIORIDAD_CHOICES = [
        ('B', 'Baja'),
        ('M', 'Media'),
        ('A', 'Alta'),
    ]
    asunto = models.CharField(max_length=50)
    mensaje = models.CharField(max_length=250)
    prioridad = models.CharField(
        max_length=1, choices=PRIORIDAD_CHOICES, default='B')
    user_destino = models.ForeignKey(User, on_delete=models.CASCADE)
    leida = models.BooleanField(default=False)

    def __str__(self):
        return '{}'.format(self.mensaje)

    class Meta:
        verbose_name_plural = "Notificaciones"
