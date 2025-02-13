"""
Custom models for Users.
"""

import uuid

from django.contrib.auth.models import AbstractUser

from django.db import models


class User(AbstractUser):
    """
    A custom User model with additional fields for avatar, bio, and location.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    avatar = models.CharField(max_length=255, null=True)
    bio = models.CharField(max_length=1000, null=True)
    location = models.CharField(max_length=255, null=True)
