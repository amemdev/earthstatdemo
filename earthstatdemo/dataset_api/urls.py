from dataset_api.views import DatasetViewSet, DatasetFieldViewSet, GeoDatumViewSet
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'datasets', DatasetViewSet)
router.register(r'geodatums', GeoDatumViewSet)
router.register(r'dataset_fields', DatasetFieldViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
