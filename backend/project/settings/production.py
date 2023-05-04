import os
from .base import *
import environ


env = environ.Env()
environ.Env.read_env()

DEBUG = False

ALLOWED_HOSTS = [env('PRODUCTION_HOST')]

SECRET_KEY = env('SECRET_KEY')

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': env('DB_ENGINE'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}

CORS_ALLOWED_ORIGINS = [
    env('PRODUCTION_HOST_WITH_PORT')
]

SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True

SECURE_HSTS_SECONDS = 1

SECURE_HSTS_INCLUDE_SUBDOMAINS = True

SECURE_HSTS_PRELOAD = True
