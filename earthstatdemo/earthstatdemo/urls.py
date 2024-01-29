from dataset_api import urls as dataset_api_urls
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('api/', include(dataset_api_urls)),
    path('admin/', admin.site.urls),
]
