from django.db import models
from users.models import User

# Create your models here.
class Test(models.Model):
  title = models.CharField(max_length=50)
  teacher = models.ForeignKey(User, on_delete=models.CASCADE)
  test = models.TextField()

  def __str__(self):
    return self.title

class GradedTest(models.Model):
  title = models.CharField(max_length=50)
  student = models.ForeignKey(User, on_delete=models.CASCADE)
  test = models.TextField()

  def __str__(self):
    return self.title