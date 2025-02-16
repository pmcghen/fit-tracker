from django.urls import path

from . import views

app_name = "activities"

urlpatterns = [
    path("add/", views.add, name="add"),
    path("activity/<uuid:activity_id>/", views.activity, name="activity"),
]
