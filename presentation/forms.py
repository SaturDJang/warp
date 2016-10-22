from django.forms import Form

from .models import Presentation


class PresentationCreateForm(Form):
    class Meta:
        model = Presentation
        fields = ['subject', 'markdown', 'is_public']

