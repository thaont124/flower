# Generated by Django 4.1.7 on 2023-04-11 04:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CategoryName', models.CharField(max_length=255)),
                ('CategoryParent', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ProductName', models.CharField(max_length=255)),
                ('ProductCode', models.CharField(max_length=255)),
                ('Price', models.IntegerField()),
                ('Quatily', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('RoleName', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('UserName', models.CharField(max_length=255)),
                ('Password', models.CharField(max_length=255)),
                ('FullName', models.CharField(max_length=255)),
                ('Email', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='UserRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Entity.role')),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Entity.user')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Time', models.TimeField()),
                ('Content', models.CharField(max_length=255)),
                ('UserIDReceiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Receiver_messages', to='Entity.user')),
                ('UserIDSend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='Entity.user')),
            ],
        ),
    ]
