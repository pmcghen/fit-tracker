import uuid
from django.db import models


class Activity(models.Model):
    """
    An activity is created from reading the FIT file provided by the upload form.
    """

    class Meta:
        verbose_name_plural = "Activities"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(to="users.user", on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    is_private = models.BooleanField(default=False)

    sport = models.CharField(max_length=255, null=True)
    sub_sport = models.CharField(max_length=255, null=True)

    timestamp = models.DateTimeField(null=True)
    start_time = models.DateTimeField(null=True)
    total_elapsed_time = models.FloatField(null=True)
    total_moving_time = models.FloatField(null=True)

    avg_heart_rate = models.IntegerField(null=True)
    min_heart_rate = models.IntegerField(null=True)
    max_heart_rate = models.IntegerField(null=True)

    avg_cadence = models.IntegerField(null=True)
    avg_running_cadence = models.IntegerField(null=True)
    max_running_cadence = models.IntegerField(null=True)
    max_cadence = models.IntegerField(null=True)
    avg_step_length = models.FloatField(null=True)

    avg_temperature = models.IntegerField(null=True)
    max_temperature = models.IntegerField(null=True)

    manufacturer = models.CharField(max_length=255, null=True)
    product_name = models.CharField(max_length=255, null=True)

    avg_power = models.IntegerField(null=True)
    max_power = models.IntegerField(null=True)

    avg_speed = models.FloatField(null=True)
    max_speed = models.FloatField(null=True)

    total_ascent = models.IntegerField(null=True)
    total_descent = models.IntegerField(null=True)
    total_distance = models.FloatField(null=True)

    total_calories = models.IntegerField(null=True)

    max_altitude = models.FloatField(null=True)
    max_neg_grade = models.FloatField(null=True)
    max_pos_grade = models.FloatField(null=True)

    num_laps = models.IntegerField(null=True)

    file = models.FileField(upload_to="fit", null=True)
    uploaded_on = models.DateTimeField(auto_now=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.description}, uploaded by {self.user} at {self.uploaded_on}"
