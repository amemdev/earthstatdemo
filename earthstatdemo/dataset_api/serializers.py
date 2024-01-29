from dataset_api.models import Dataset, GeoDatum
from rest_framework import serializers


class DatasetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dataset
        fields = ['title']
