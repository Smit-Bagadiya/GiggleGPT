from django.db import models

# Create your models here.

class Character(models.Model):
    name = models.CharField(max_length=100)
    personality_prompt = models.TextField()
    avatar = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
