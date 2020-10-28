from rest_framework.routers import DefaultRouter
from test.views import TestlistViewSet

router = DefaultRouter()
router.register(r'', TestlistViewSet, base_name='tests')
urlpatterns = router.urls
