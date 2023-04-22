# from django.conf.urls import url
from django.urls import path, include
from .views import (
    EventDetailApiView,
    EventListApiView,
)

urlpatterns = [
    path('', EventListApiView.as_view()),
    path('<int:pk>/', EventDetailApiView.as_view()),
]
