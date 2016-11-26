from django.contrib.auth.models import AnonymousUser
from django.core.urlresolvers import reverse
from django.test import TestCase
from django.test import RequestFactory

from presentation.models import Presentation
from presentation.views import PresentationList
from warp.users.models import User


class PresentationListTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.test_user = self.create_test_user()
        self.presentation = Presentation(subject="subject",
                                   author=self.test_user,
                                   markdown="#Abcdefghijklmno",
                                   html="<h1>Abcdefghijklmno</h1>")
        for _ in (0, 20):
            self.presentation.save()


    def test_get_presentation_list_page(self):
        presentation_list_url = reverse('presentation:list')
        request = self.factory.get(presentation_list_url)

        request.user = AnonymousUser()
        response = PresentationList.as_view()(request)
        self.assertIn(response, self.presentaion.subject)
        self.assertIn(response, self.presentaion.author.name)


    def create_test_user(self):
        name = "Name name"
        username = "username"
        first_name = "Name"
        last_name = "name"
        email = "test@example.com"
        is_staff = False
        is_active = True
        user = User(name=name,
                    username=username,
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    is_staff=is_staff,
                    is_active=is_active)
        user.save()

        return user








