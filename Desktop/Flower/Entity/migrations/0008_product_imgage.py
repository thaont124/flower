# Generated by Django 4.1.7 on 2023-04-18 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Entity', '0007_remove_category_categoryparent'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Imgage',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
