from django.db import models
class Product(models.Model):
    ProductName = models.CharField(max_length=255)
    ProductCode = models.CharField(max_length=255)
    Price = models.IntegerField()
    Quatily = models.IntegerField()
    Imgage = models.CharField(max_length=255, null=True)
    Status = models.CharField(max_length=255, null=True)
