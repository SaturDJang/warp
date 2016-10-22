from django.forms import ModelForm

from .models import Presentation


class PresentationCreateForm(ModelForm):
    class Meta:
        model = Presentation
        fields = ['subject', 'markdown', 'is_public']
