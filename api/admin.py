from django.contrib import admin

from .models import Choice, Question, Practice, GradedPractice

admin.site.register(Choice)
admin.site.register(Question)
admin.site.register(Practice)
admin.site.register(GradedPractice)
