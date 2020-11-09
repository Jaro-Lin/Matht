from django.db import models
from users.models import User

# Create your models here.
class Homework(models.Model):
    file = models.FileField()

    def __str__(self):
        return self.file.name

class HomeworkMark(models.Model):
    grade = models.DecimalField(decimal_places=0,max_digits=3)
    student = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.student.username

class Material(models.Model):
    file = models.FileField()

    def __str__(self):
        return self.file.name

class MarkedTest(models.Model):
    grade = models.DecimalField(decimal_places=0,max_digits=3)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField()

    def __str__(self):
        return self.student.username