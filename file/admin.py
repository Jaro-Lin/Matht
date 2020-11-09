from django.contrib import admin

# Register your models here.
from .models import Homework, Material, MarkedTest, HomeworkMark

admin.site.register(Homework)
admin.site.register(HomeworkMark)
admin.site.register(Material)
admin.site.register(MarkedTest)