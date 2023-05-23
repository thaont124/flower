from django.db import models
class User(models.Model):
    UserName = models.CharField(max_length=255)
    Password = models.CharField(max_length=255)
    FullName = models.CharField(max_length=255)
    Email = models.CharField(max_length=255)
    