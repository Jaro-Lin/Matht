from django.db import models
from users.models import User

# Create your models here.

class Class(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

    def __str__(self):
        return self.title