from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

@login_required
def index(request) -> HttpResponse:
    return HttpResponse(render(request, "dashboard/index.html"))