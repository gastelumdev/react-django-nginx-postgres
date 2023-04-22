import uuid
from django.db import models

from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    owner = models.ForeignKey(
        User, related_name='events', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, default=uuid.uuid1)
    overview = models.TextField()
    date = models.DateTimeField()
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    zipcode = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Participant(models.Model):
    organizer = models.ForeignKey(
        User, related_name='participants', on_delete=models.CASCADE)
    event = models.ManyToManyField(Event, related_name='events')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    email = models.EmailField(max_length=200)
    status = models.PositiveSmallIntegerField()
    group_name = models.CharField(max_length=254)
    street = models.CharField(max_length=254)
    city = models.CharField(max_length=254)
    zipcode = models.CharField(max_length=254)
    band_director_name = models.CharField(max_length=254)
    band_director_phone = models.CharField(max_length=254)
    band_director_email = models.CharField(max_length=254)
    booster_parent_name = models.CharField(max_length=254)
    booster_parent_phone = models.CharField(max_length=254)
    booster_parent_email = models.CharField(max_length=254)
    parade_march_title = models.CharField(max_length=254)
    parade_march_composer = models.CharField(max_length=254)
    additional_band_staff_names = models.CharField(max_length=254)
    drum_major = models.CharField(max_length=254)
    drum_major_name = models.CharField(max_length=254)
    color_guard_advisor = models.CharField(max_length=254)
    color_guard_captains = models.CharField(max_length=254)
    drill_team = models.CharField(max_length=254)
    drill_team_advisor = models.CharField(max_length=254)
    drill_team_captains = models.CharField(max_length=254)
    school_enrollment = models.CharField(max_length=254)
    number_of_students_in_band = models.PositiveSmallIntegerField()
    number_of_students_in_color_guard = models.PositiveSmallIntegerField()
    number_of_students_in_drill_team = models.PositiveSmallIntegerField()
    number_of_buses = models.PositiveSmallIntegerField()
    number_of_box_trucks = models.PositiveSmallIntegerField()
    number_of_trailers = models.PositiveSmallIntegerField()
    number_of_tractor_trailer_rigs = models.PositiveSmallIntegerField()
    special_instructions = models.CharField(max_length=254)

    def __str__(self):
        return self.name
