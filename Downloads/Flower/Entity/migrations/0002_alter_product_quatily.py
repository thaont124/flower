# Generated by Django 4.1.7 on 2023-04-11 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Entity', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='Quatily',
            field=models.IntegerField(),
        ),
    ]
