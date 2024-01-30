from dataset_api.models import Dataset, DatasetField, GeoDatum
from rest_framework import serializers


class DatasetFieldSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = DatasetField
        fields = ['id', 'dataset', 'title', 'datatype']


class DatasetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    fields = DatasetFieldSerializer(many=True, read_only=True)

    class Meta:
        model = Dataset
        fields = ['id', 'title', 'fields']


class GeoDatumSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = GeoDatum
        fields = ['id', 'dataset', 'label', 'lat', 'lng', 'height', 'data']
