# Configuracion Local
from .settings_base import *

DEBUG = False

ALLOWED_HOSTS = ['172.105.148.177', '192.168.232.139']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'cloudstg',
        'USER': 'mcosta',
        'PASSWORD': 'Ro190180',
        'PORT': 5432,
        'HOST': 'localhost'
    }
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIR = (BASE_DIR,  'static')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
