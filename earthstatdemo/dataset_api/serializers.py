from dataset_api.models import Dataset, GeoDatum
from rest_framework import serializers


class DatasetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Dataset
        fields = ['id', 'title']


class GeoDatumSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = GeoDatum
        fields = ['id', 'dataset', 'label', 'lat', 'lng', 'height', 'datum']
