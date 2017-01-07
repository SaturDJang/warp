import factory
from factory import SubFactory

from presentation.models import Presentation
from warp.users.models import User


class UserFactory(factory.django.DjangoModelFactory):
    username = 'jellyms'
    email = 'chm073@sh8.email'
    password = 'P@$$w0rD'

    class Meta:
        model = User
        django_get_or_create = ('username', )


class PresentationFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Presentation

    subject = 'This is about Jelly'
    author = SubFactory(UserFactory)
    views = 532345
