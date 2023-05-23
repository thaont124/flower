from django.db import models
from .Product import Product
from .User import User
class Order(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Date = models.DateTimeField()
    Status = models.CharField(max_length=255)
    Amount = models.IntegerField(null = True)
    Address = models.CharField(max_length=255, null = True)
    PhoneNumber = models.CharField(max_length=255, null = True)
    