# Generated by Django 5.2.3 on 2025-07-04 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='avatar',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='character',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
