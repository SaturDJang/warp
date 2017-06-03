from django.contrib import admin

from .models import Presentation, Slide, Tag

# Register your models here.
admin.site.register(Presentation)
admin.site.register(Slide)
admin.site.register(Tag)
