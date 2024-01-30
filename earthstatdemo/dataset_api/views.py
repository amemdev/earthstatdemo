from dataset_api.models import Dataset, GeoDatum
from dataset_api.serializers import DatasetSerializer, GeoDatumSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets


class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all().order_by('title')
    serializer_class = DatasetSerializer


class GeoDatumViewSet(viewsets.ModelViewSet):
    queryset = GeoDatum.objects.all()
    serializer_class = GeoDatumSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['dataset']
