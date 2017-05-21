from django.core.urlresolvers import reverse
from django.db import models
from django.db.models import Manager
from django.db.models import QuerySet
from model_utils.models import TimeStampedModel

from warp.users.models import User


class PresentationQuerySet(QuerySet):
    def public(self):
        return self.filter(is_public=True)

    def authored_by(self, author):
        return self.filter(author__username=author)


class PresentationManager(Manager):
    def get_queryset(self):
        return PresentationQuerySet(self.model, using=self._db)

    def public(self):
        return self.get_queryset().public()

    def authored_by(self, author):
        return self.get_queryset().authored_by(author)


class Presentation(TimeStampedModel):
    subject = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    is_public = models.BooleanField(default=True)

    objects = PresentationManager()

    def __str__(self):
        return self.subject

    def get_absolute_url(self, *args, **kwargs):
        return reverse('presentation:detail', kwargs={'pk': self.pk})

class Slide(TimeStampedModel):
    presentation = models.ForeignKey(Presentation, on_delete=models.CASCADE)
    slide_order = models.PositiveSmallIntegerField()
    markdown = models.TextField()

    def __str__(self):
        return self.markdown
