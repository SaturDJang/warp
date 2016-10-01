from django.db import models
from model_utils.models import TimeStampedModel

from warp.users.models import User


class Presentation(TimeStampedModel):
    subject = models.CharField(max_length=50)
    markdown = models.TextField()
    html = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
