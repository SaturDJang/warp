from django.db import models
from model_utils.models import TimeStampedModel

from warp.users.models import User


class Presentation(TimeStampedModel):
    subject = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    markdown = models.TextField()
    html = models.TextField()
    is_public = models.BooleanField(default=True)
