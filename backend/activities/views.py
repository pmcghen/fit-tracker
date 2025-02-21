from django.shortcuts import render, reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect

from .forms import UploadActivityForm
from .models import Activity
from .add.process_fit import process_fit


@login_required
def add(request) -> HttpResponse:
    if request.method == "POST":
        form = UploadActivityForm(request.POST, request.FILES)
        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]
            fit_file = form.files["fitFile"]
            activity = Activity(
                user=request.user, title=title, description=description, file=fit_file
            )
            activity.save()
            activity_data = process_fit(activity.file)
            create_activity(activity, activity_data)
            # return HttpResponseRedirect(
            #     reverse("activities:activity", args=activity.id)
            # )

    return HttpResponse(render(request, "activities/add.html"))


def create_activity(activity: Activity, activity_data: dict):
    if "manufacturer" in activity_data:
        activity.manufacturer = activity_data["manufacturer"]
    if "product_name" in activity_data:
        activity.product_name = activity_data["product_name"]
    if "sport" in activity_data:
        activity.sport = activity_data["sport"]
    if "sub_sport" in activity_data:
        activity.sub_sport = activity_data["sub_sport"]
    if "timestamp" in activity_data:
        activity.timestamp = activity_data["timestamp"]
    if "start_time" in activity_data:
        activity.start_time = activity_data["start_time"]
    if "total_elapsed_time" in activity_data:
        activity.total_elapsed_time = activity_data["total_elapsed_time"]
    if "total_moving_time" in activity_data:
        activity.total_moving_time = activity_data["total_moving_time"]
    if "total_distance" in activity_data:
        activity.total_distance = activity_data["total_distance"]
    if "total_calories" in activity_data:
        activity.total_calories = activity_data["total_calories"]
    if "num_laps" in activity_data:
        activity.num_laps = activity_data["num_laps"]
    if "avg_speed" in activity_data:
        activity.avg_speed = activity_data["avg_speed"]
    if "max_speed" in activity_data:
        activity.max_speed = activity_data["max_speed"]
    if "avg_power" in activity_data:
        activity.avg_power = activity_data["avg_power"]
    if "max_power" in activity_data:
        activity.max_power = activity_data["max_power"]
    if "avg_heart_rate" in activity_data:
        activity.avg_heart_rate = activity_data["avg_heart_rate"]
    if "min_heart_rate" in activity_data:
        activity.min_heart_rate = activity_data["min_heart_rate"]
    if "max_heart_rate" in activity_data:
        activity.max_heart_rate = activity_data["max_heart_rate"]
    if "avg_cadence" in activity_data:
        activity.avg_cadence = activity_data["avg_cadence"]
    if "max_cadence" in activity_data:
        activity.max_cadence = activity_data["max_cadence"]
    if "avg_running_cadence" in activity_data:
        activity.avg_running_cadence = activity_data["avg_running_cadence"]
    if "max_running_cadence" in activity_data:
        activity.max_running_cadence = activity_data["max_running_cadence"]
    if "avg_step_length" in activity_data:
        activity.avg_step_length = activity_data["avg_step_length"]
    if "total_ascent" in activity_data:
        activity.total_ascent = activity_data["total_ascent"]
    if "total_descent" in activity_data:
        activity.total_descent = activity_data["total_descent"]

    activity.save()


def activity(request, activity_id) -> HttpResponse:
    context = {"activity": activity_id}
    return HttpResponse(render(request, "activities/activity.html", context))
