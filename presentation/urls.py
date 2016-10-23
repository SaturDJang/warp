from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.PresentationList.as_view(),
        name='list'
    ),
    url(
        regex=r'^create$',
        view=views.CreatePresentation.as_view(),
        name='create'
    )
]
