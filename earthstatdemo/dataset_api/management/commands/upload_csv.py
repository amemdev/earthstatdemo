"""
    Command for processing this CSV dataset:
    https://www.kaggle.com/datasets/thedevastator/unraveling-global-climate-change-through-tempera?resource=download
"""
import csv
from django.core.management.base import BaseCommand, CommandError
from dataset_api.models import Dataset, DatasetField, GeoDatum


def convert(tude):
    multiplier = 1 if tude[-1] in ['N', 'E'] else -1
    return multiplier * sum(float(x) / 60 ** n for n, x in enumerate(tude[:-1].split('-')))


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str)

    def handle(self, *args, **options):
        print(options["csv_file"])
        countries = {}

        with open(options["csv_file"], newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter=',', quotechar='|')

            # skip first row
            next(reader)

            for row in reader:
                country = row[5]
                city = row[4]
                lat = row[6]
                long = row[7]
                avg_temp = row[2]
                dt = row[1]

                if country not in countries:
                    countries[country] = True
                    ds = Dataset.objects.create(
                        title=f"{country} Major Cities Avg Temperatures"
                    )
                    dsf = DatasetField(title='avg_temp',
                                       datatype='float', dataset=ds)
                    dsf.save()
                else:
                    ds = Dataset.objects.get(
                        title=f"{country} Major Cities Avg Temperatures"
                    )

                gd = GeoDatum(
                    dataset=ds,
                    label=city,
                    date=dt,
                    lng=convert(long),
                    lat=convert(lat),
                    height=0,
                    data={'avg_temp': avg_temp}
                )

                gd.save()
