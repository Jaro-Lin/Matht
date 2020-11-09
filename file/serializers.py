from rest_framework import serializers
from .models import Homework, Material, MarkedTest, HomeworkMark
from users.models import User

class HomeworkFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = "__all__"

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = "__all__"

class MarkedTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkedTest
        fields = "__all__"

    def create(self, request):
        data = request.data

        markedTest = MarkedTest()
        student = User.objects.get(username=data['student'])
        markedTest.student = student
        markedTest.grade = data['grade']
        markedTest.save()
        return markedTest

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeworkMark
        fields = "__all__"

    def create(self, request):
        data = request.data

        marks = HomeworkMark()
        print(data)
        student = User.objects.get(username=data['student'])
        marks.student = student
        marks.grade = data['grade']
        marks.save()
        return marks