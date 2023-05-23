from django.db import models
from .Product import Product
from .Category import Category
class CategoryProduct(models.Model):
    Category = models.ForeignKey(Category,on_delete=models.CASCADE)
    Product = models.ForeignKey(Product,on_delete=models.CASCADE)