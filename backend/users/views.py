from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse


def index(request) -> HttpResponse:
    return HttpResponse(render(request, "users/index.html"))

def login_view(request) -> HttpResponse:
    if request.POST:
        username = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("dashboard:index"))

    return HttpResponse(render(request, "users/login.html"))

def register(request) -> HttpResponse:
    return HttpResponse(render(request, "users/register.html"))

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("users:index"))