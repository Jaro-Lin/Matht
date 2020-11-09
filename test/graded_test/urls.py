from django.urls import path
from test.views import GradedTestListViewSet, TestCreateListView

urlpatterns = [
    path('', GradedTestListViewSet.as_view({'get': 'list'})),
    path('createTest/', TestCreateListView.as_view()),
]
