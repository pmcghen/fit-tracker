from django.shortcuts import render, reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect

from .forms import UploadActivityForm
from .add.process_fit import process_fit


@login_required
def add(request) -> HttpResponse:
    if request.method == "POST":
        form = UploadActivityForm(request.POST, request.FILES)
        print(form)
        if form.is_valid():
            print("How?")
            activity_data = process_fit(request.FILES["fitFile"])
            create_activity(activity_data)
            return HttpResponseRedirect(reverse("activities:activity"))

    return HttpResponse(render(request, "activities/add.html"))


def create_activity(activity_data: dict):
    print(activity_data)


def activity(request, activity_id) -> HttpResponse:
    context = {"activity": activity_id}
    return HttpResponse(render(request, "activities/activity.html", context))
