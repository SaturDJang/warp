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
        return PresentationQuerySet(self.model, using=self._db).select_related('author')

    def public(self):
        return self.get_queryset().public()

    def authored_by(self, author):
        return self.get_queryset().authored_by(author)


class Tag(models.Model):
    name = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return self.name


class Presentation(TimeStampedModel):
    subject = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    is_public = models.BooleanField(default=True)
    tags = models.ManyToManyField(Tag)

    like_users = models.ManyToManyField(User, related_name='like_users')

    def like_toggle(self, user):
        is_like = False
        try:
            self.like_users.get(id=user.id)
            self.like_users.remove(user)
        except User.DoesNotExist:
            self.like_users.add(user)
            is_like = True
        self.likes = self.like_users.count()
        self.save()
        return is_like

    objects = PresentationManager()

    def view(self):
        self.views += 1
        self.save()

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
