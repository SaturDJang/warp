from django.db import models
from model_utils.models import TimeStampedModel

from warp.users.models import User


class Presentation(TimeStampedModel):
    subject = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return self.subject


class Slide(TimeStampedModel):
    presentation = models.ForeignKey(Presentation, on_delete=models.CASCADE)
    slide_order = models.PositiveSmallIntegerField()
    markdown = models.TextField()

    def __str__(self):
        return self.markdown
