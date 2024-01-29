from dataset_api.models import Dataset, GeoDatum
from rest_framework import serializers


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['title']


class GeoDatumSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoDatum
        fields = ['dataset', 'label', 'lng', 'lat', 'height', 'datum']
