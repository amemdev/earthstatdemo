from dataset_api import urls as dataset_api_urls
from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import TemplateView

urlpatterns = [
    path('api/', include(dataset_api_urls)),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(
        template_name='site/app.html'), name='app-page'),
]
