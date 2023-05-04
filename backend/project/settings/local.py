from .base import *
import os


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'Coll@b#2023',
        'HOST': 'db',
        'PORT': 5432,
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:81"
]
