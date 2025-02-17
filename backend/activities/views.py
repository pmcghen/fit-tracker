from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from .forms import UploadActivityForm
from .models import Activity


@login_required
def add(request) -> HttpResponse:
    if request.method == "POST":
        form = UploadActivityForm(request.POST, request.FILES)
        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]
            fit_file = form.files["fitFile"]
            activity = Activity(user=request.user, title=title, description=description, file=fit_file)
            activity.save()

    return HttpResponse(render(request, "activities/add.html"))

def create_activity(activity_data: dict):
    print(activity_data)


def activity(request, activity_id) -> HttpResponse:
    context = {"activity": activity_id}
    return HttpResponse(render(request, "activities/activity.html", context))
