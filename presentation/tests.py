from django.core.urlresolvers import reverse
from test_plus import TestCase

from warp.users.tests.factories import PresentationFactory


class PresentationListTest(TestCase):
    def setUp(self):
        for _ in range(0, 20):
            self.presentation = PresentationFactory()

    def test_get_presentation_list_page(self):
        self.get_check_200(reverse('presentation:list'))
        self.assertResponseContains(PresentationFactory.subject, html=False)
        self.assertResponseContains(PresentationFactory.views, html=False)
        author = PresentationFactory.author.get_factory()
        self.assertResponseContains(author.username, html=False)

    def test_pagination(self):
        second_page_url = reverse('presentation:list') + "?page=2"
        self.get_check_200(second_page_url)
        self.assertResponseContains(
            '''<ul class="pagination text-center" role="navigation" aria-label="Pagination">''')
        self.assertResponseContains('''<li><a href="#" aria-label="Page 1">1</a></li>''')

