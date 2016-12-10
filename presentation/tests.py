from django.core.urlresolvers import reverse
from django.test import Client
from django.test import TestCase

from presentation.models import Presentation
from warp.users.models import User


class PresentationListTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = self.create_test_user()
        self.presentation = Presentation(subject="subject",
                                         author=self.test_user,
                                         markdown="#Abcdefghijklmno",
                                         html="<h1>Abcdefghijklmno</h1>")
        for _ in range(0, 20):
            self.presentation.save()

    def test_get_presentation_list_page(self):
        response = self.client.get(reverse('presentation:list'))

        self.assertContains(response, self.presentation.subject)
        self.assertContains(response, self.presentation.author.username)

    @staticmethod
    def create_test_user():
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
