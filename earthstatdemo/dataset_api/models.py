from django.db import models


class Dataset(models.Model):
    title = models.CharField(max_length=500)

    def __str__(self):
        return self.title


class DatasetField(models.Model):
    dataset = models.ForeignKey(
        Dataset, on_delete=models.CASCADE, related_name="fields")
    title = models.CharField(max_length=500)
    datatype = models.CharField(max_length=500)

    def __str__(self):
        return self.title


class GeoDatum(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    label = models.CharField(max_length=500, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    height = models.DecimalField(max_digits=10, decimal_places=6)
    data = models.JSONField(blank=True)

    def __str__(self):
        return f'({self.lat}, {self.lng})'
