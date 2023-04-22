# from django.conf.urls import url
from django.urls import path, include
from .views import (
    EventListApiView,
)

urlpatterns = [
    path('', EventListApiView.as_view()),
]
