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

class TestUpdateSerializer(serializers.ModelSerializer):
  student = StringSerializer(many=False)

  class Meta:
    model = Test
    fields = ('__all__')

  def create(self, request):
    data = request.data

    test = Test.objects.get(id=data['testId'])
    student = User.objects.get(username=data['username'])
    graded_test = GradedTest()
    graded_test.title = test.title
    graded_test.test = test.test
    graded_test.student = student
    graded_test.save()
    return graded_test

  def update(self, instance, request):
    data = request.data

    instance.test = data.get('test', instance.test)
    instance.save()
    return instance