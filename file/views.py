from django.shortcuts import render

import os
# Create your views here.
from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from .serializers import HomeworkFileSerializer, MaterialSerializer, MarkedTestSerializer, MarksSerializer
from .models import Homework, Material, MarkedTest, HomeworkMark
from rest_framework.generics import GenericAPIView
from django.http import Http404, StreamingHttpResponse, FileResponse
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

class HomeworkFileViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    serializer_class = HomeworkFileSerializer
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        #serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        file_serializer = HomeworkFileSerializer(data=request.data)
        file_serializer.is_valid()
        upload = file_serializer.save()
        print(request.data)
        if upload:
            return Response(file_serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=HTTP_400_BAD_REQUEST)


def download(request):
    try:
        path = request.data[22:]
        print(path)
        response = StreamingHttpResponse(open(path, 'rb'))
        response['content_type'] = "application/octet-stream"
        response['Content-Disposition'] = 'attachment; filename=' + path
        return response
    except Exception:
        raise Http404

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    def post(self, request, *args, **kwargs):
        #serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        file_serializer = MaterialSerializer(data=request.data)
        file_serializer.is_valid()
        upload = file_serializer.save()
        print(request.data)
        if upload:
            return Response(file_serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=HTTP_400_BAD_REQUEST)


class MarkedTestViewSet(viewsets.ModelViewSet):
    queryset = MarkedTest.objects.all()
    serializer_class = MarkedTestSerializer

    def post(self, request, *args, **kwargs):
        #serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        file_serializer = MarkedTestSerializer(data=request.data)
        file_serializer.is_valid()
        upload = file_serializer.save()
        print(request.data)
        markedTest = file_serializer.create(request)
        if upload:
            if markedTest:
                return Response(file_serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=HTTP_400_BAD_REQUEST)

class MarksViewSet(viewsets.ModelViewSet):
    queryset = HomeworkMark.objects.all()
    serializer_class = MarksSerializer
    print("request.data")

    def post(self, request, *args, **kwargs):
        #serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        print(request.data)
        serializer = MarksSerializer(data=request.data)
        serializer.is_valid()
        marks = serializer.create(request)
        if marks:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
