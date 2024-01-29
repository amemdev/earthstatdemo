from django.db import models


class Dataset(models.Model):
    title = models.CharField(max_length=500)

class GeoDatum(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    label = models.CharField(max_length=500, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    height = models.DecimalField(max_digits=10, decimal_places=6)
    datum = models.DecimalField(max_digits=15, decimal_places=6)