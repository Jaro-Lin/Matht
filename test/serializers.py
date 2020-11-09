from rest_framework import serializers
from .models import Test, GradedTest
from users.models import User

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class TestCreateSerializer(serializers.ModelSerializer):
  teacher = StringSerializer(many=False)

  class Meta:
    model = Test
    fields = ('__all__')

  def create(self, request):
    data = request.data

    test = Test()
    teacher = User.objects.get(username=data['teacher'])
    test.teacher = teacher
    test.title = data['title']
    test.test = data['test']
    test.save()
    return test


class TestListSerializer(serializers.ModelSerializer):

  class Meta:
    model = GradedTest
    fields = ('__all__')


class TestUpdateSerializer(serializers.ModelSerializer):
  student = StringSerializer(many=True)

  class Meta:
    model = GradedTest
    fields = ('__all__')

  def create(self, request):
    data = request.data

    graded_test = GradedTest()
    student = User.objects.get(username=data['username'])
    #title = Test.objects.get(id=data['testId'])
    graded_test.student = student
    graded_test.title = data['title']
    graded_test.test = data['test']
    graded_test.save()
    return graded_test
