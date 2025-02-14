from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

@login_required
def index(request) -> HttpResponse:
    return HttpResponse(render(request, "upload/index.html"))

def upload(request) -> HttpResponseRedirect:
    return HttpResponseRedirect(reverse("dashboard:index"))
