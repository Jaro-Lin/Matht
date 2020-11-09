from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.
from rest_framework.generics import ListAPIView, ListCreateAPIView
from django.views.generic.detail import DetailView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .models import Test, GradedTest
from .serializers import TestCreateSerializer, TestUpdateSerializer, TestListSerializer

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


class GradedTestListViewSet(viewsets.ModelViewSet):
    queryset = GradedTest.objects.all()
    serializer_class = TestListSerializer

    def get_queryset(self):
        queryset = GradedTest.objects.all()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(id=id)
        return queryset


class TestCreateListView(ListCreateAPIView):
    queryset = GradedTest.objects.all()
    serializer_class = TestUpdateSerializer

    def post(self, request):
        print(request.data)
        serializer = TestUpdateSerializer(data=request.data)
        graded_test = serializer.create(request)
        serializer.is_valid()
        if graded_test:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
