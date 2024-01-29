from dataset_api.views import DatasetViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'datasets', DatasetViewset)

urlpatterns = [
    path('', include(router.urls)),
]
