from django.db import models


class Activity(models.Model):
    """
    An activity is created from reading the FIT file provided by the upload form.
    """

    id = models.CharField(max_length=255)
    user = models.IntegerField()

    sport = models.CharField(max_length=255)
    sub_sport = models.CharField(max_length=255)

    timestamp = models.DateTimeField()
    start_time = models.DateTimeField()
    total_elapsed_time = models.FloatField()
    total_moving_time = models.FloatField()

    avg_heart_rate = models.IntegerField()
    min_heart_rate = models.IntegerField()
    max_heart_rate = models.IntegerField()

    avg_cadence = models.IntegerField()
    avg_running_cadence = models.IntegerField()
    max_cadence = models.IntegerField()
    avg_step_length = models.FloatField()

    avg_temperature = models.IntegerField()
    max_temperature = models.IntegerField()

    manufacturer = models.CharField(max_length=255)
    product_name = models.CharField(max_length=255)

    avg_power = models.IntegerField()
    max_power = models.IntegerField()

    avg_speed = models.FloatField()
    max_speed = models.FloatField()

    total_ascent = models.IntegerField()
    total_descent = models.IntegerField()
    total_distance = models.FloatField()

    total_calories = models.IntegerField()

    file = models.FileField()
    uploaded_on = models.DateTimeField(auto_now=True)
    updated_on = models.DateTimeField(auto_now=True)
