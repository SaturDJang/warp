from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.PresentationList.as_view(),
        name='list'
    ),
    url(
        regex=r'^search$',
        view=views.PresentationSearchList.as_view(),
        name='search'
    ),
    url(
        regex=r'^create$',
        view=views.PresentationCreate.as_view(),
        name='create'
    ),
    url(
        regex=r'^detail/(?P<pk>\d+)$',
        view=views.PresentationDetail.as_view(),
        name='detail'
    ),
    url(
        regex=r'^update/(?P<pk>\d+)$',
        view=views.PresentationUpdate.as_view(),
        name='update'
    ),
    url(
        regex=r'^delete/(?P<pk>\d+)$',
        view=views.PresentationDelete.as_view(),
        name='delete'
    ),
    url(
        regex=r'^like/(?P<pk>\d+)$',
        view=views.like_presentation,
        name='like'
    ),
]
