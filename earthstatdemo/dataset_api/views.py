from dataset_api.models import Dataset, DatasetField, GeoDatum
from dataset_api.serializers import DatasetSerializer, DatasetFieldSerializer, GeoDatumSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets


class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all().order_by('title')
    serializer_class = DatasetSerializer


class DatasetFieldViewSet(viewsets.ModelViewSet):
    queryset = DatasetField.objects.all()
    serializer_class = DatasetFieldSerializer


class GeoDatumViewSet(viewsets.ModelViewSet):
    queryset = GeoDatum.objects.all()
    serializer_class = GeoDatumSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['dataset', 'date']
