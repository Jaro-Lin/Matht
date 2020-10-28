from django.urls import path
from test.views import GradedTestListView, TestCreateListView, TestUpdateListView

urlpatterns = [
    path('', GradedTestListView.as_view()),
    path('createTest/', TestCreateListView.as_view()),
    path('updateTest/', TestUpdateListView.as_view()),
]
