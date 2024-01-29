from dataset_api.models import Dataset
from dataset_api.serializers import DatasetSerializer
from rest_framework import permissions, viewsets


class DatasetViewset(viewsets.ModelViewSet):
    queryset = Dataset.objects.all().order_by('title')
    serializer_class = DatasetSerializer
