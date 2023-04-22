from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Event
from .serializers import EventSerializer


class EventListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        events = Event.objects.filter(owner=request.user.id)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # data = {
        #     'owner': request.user.id,
        #     'title': request.data.get('title'),
        #     'overview': request.data.get('overview'),
        #     'title': request.data.get('title'),
        #     'date': request.data.get('date'),
        #     'street': request.data.get('street'),
        #     'city': request.data.get('city'),
        #     'state': request.data.get('state'),
        #     'country': request.data.get('country'),
        #     'zipcode': request.data.get('zipcode'),
        # }

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, id):
        try:
            return Event.objects.get(pk=pk, owner=id)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        event = self.get_object(pk, request.user.id)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        event = self.get_object(pk, request.user.id)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        event = self.get_object(pk, request.user.id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
