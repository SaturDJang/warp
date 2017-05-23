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
        view=views.PresentationCreate.as_view(),
        name='create'
    ),
    url(
        regex=r'^detail/(?P<pk>\d+)$',
        view=views.PresentationDetail.as_view(),
        name='detail'
    ),
    url(
<<<<<<< HEAD
        regex=r'^like/(?P<pk>\d+)$',
        view=views.like_presentation,
        name='like'
=======
        regex=r'^update/(?P<pk>\d+)$',
        view=views.PresentationUpdate.as_view(),
        name='update'
>>>>>>> 7e8d864d76cf608c0ca87e6657d8ffe5bc83e354
    )
]
