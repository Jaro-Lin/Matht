from django.urls import path, include, re_path
from rest_framework import routers
from file.views import HomeworkFileViewSet, MaterialViewSet, MarkedTestViewSet, MarksViewSet
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static
from . import views

router = routers.DefaultRouter()
router.register(r'homework', HomeworkFileViewSet)
router.register(r'material', MaterialViewSet)
router.register(r'marked', MarkedTestViewSet)
router.register(r'marks', MarksViewSet)

urlpatterns = [
    path('', include(router.urls)),
    re_path(r'media/(?P<path>.*)$',serve,{'document_root':settings.MEDIA_ROOT}),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)