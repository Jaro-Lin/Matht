from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .models import Test, GradedTest
from .serializers import TestCreateSerializer, TestUpdateSerializer


class TestlistViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestCreateSerializer

    def create(self, request):
        serializer = TestCreateSerializer(data=request.data)
        if serializer.is_valid():
            test = serializer.create(request)
            if test:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class GradedTestListView(ListCreateAPIView):
    serializer_class = TestUpdateSerializer

    def get_queryset(self):
        queryset = GradedTest.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(student__username=username)
        return queryset


class TestCreateListView(ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestUpdateSerializer

    def post(self, request):
        print(request.data)
        serializer = TestUpdateSerializer(data=request.data)
        serializer.is_valid()
        graded_assignment = serializer.create(request)
        if graded_assignment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

class TestUpdateListView(RetrieveUpdateDestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestUpdateSerializer

    def put(self, request, id):
        print(request.data)
        ids = Test.objects.get(id=id)
        serializer = TestUpdateSerializer(instance=ids, data=request.data)
        serializer.is_valid()
        graded_assignment = serializer.update(id, request)
        if graded_assignment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
