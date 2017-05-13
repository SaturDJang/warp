# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)

    def __str__(self):
        return self.username

    def get_profile_image_url(self):
        social_image = None
        if self.socialaccount_set.all():
            social_image = self.socialaccount_set.all()[0].get_avatar_url()
        if social_image:
            return social_image
        return '/static/images/default_profile.svg'

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})
