# Generated by Django 5.0.1 on 2024-01-30 09:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dataset_api', '0003_datasetfields'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='DatasetFields',
            new_name='DatasetField',
        ),
    ]