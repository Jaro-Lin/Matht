from django.contrib import admin

# Register your models here.
from .models import Test, GradedTest

admin.site.register(Test)
admin.site.register(GradedTest)