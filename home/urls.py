from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('admin/', admin.site.urls),
    path('practice/', include('api.practice.urls')),
    path('graded-practice/', include('api.graded_practice.urls')),
    path('test/', include('test.test.urls')),
    path('graded-test/', include('test.graded_test.urls')),
    path('users/', include('users.urls')),
    path('file/', include('file.urls')),
    path('class/', include('class.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
