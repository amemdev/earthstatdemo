# EarthStatDemo

EarthStatDemo provides:

- A REST API for working with simple geographic data
- A frontend for visualising datasets on an interactive model of Earth

This demo was made for a job application in about a day.

The following CSV dataset was used for the sample data:

https://www.kaggle.com/datasets/thedevastator/unraveling-global-climate-change-through-tempera?resource=download

### Requirements

- Python 3.10
- Node v14

### Directories

| Path                        | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| earthstatdemo               | Django project root containing manage.py               |
| earthstatdemo/earthstatdemo | Django project folder containing settings.py           |
| static                      | Static files. This is dest folder for webpack as well  |
| assets                      | Source folder for webpack. Contains the js application |

### Setup

While in the project root:

```
# Install pip dependencies
pip install requirements.txt
```

Front-end assets:

```
npm install

# To watch front end project for changes:
npm run dev

# To compile for production
npm run prod
```

#### Database

```
cd earthstatdemo

python manage.py migrate
```

#### Launch

```
python manage.py runserver
```

### API

The API can be interacted with via a browser by visiting the endpoints.

| Resource     | API                 |
| ------------ | ------------------- |
| Dataset      | /api/datasets       |
| DatasetField | /api/dataset_fields |
| Geodatum     | /api/geodatums      |
