import re

from django import forms
from django.core.exceptions import ValidationError
from django.forms import RadioSelect

from .models import Presentation, Slide


class PresentationBaseForm(forms.ModelForm):
    subject = forms.CharField(max_length=50)
    markdown = forms.CharField(widget=forms.HiddenInput(), required=True)
    is_public = forms.BooleanField(initial=True,
                                   required=False,
                                   widget=RadioSelect(choices=[
                                       (True, 'public'), (False, 'private')]))

    def clean_tags(self):
        tags = self.cleaned_data['tags']
        if len(tags) > 20:
            raise ValidationError("Too much tags")
        for tag in tags:
            print(tag)
            if len(tag) > 16:
                raise ValidationError("Too long tag")

        return tags

    def add_slide_list(self, presentation):
        markdown = self.cleaned_data.get('markdown')
        slide_list = re.split("={5,}", markdown)
        Slide.objects.filter(presentation=presentation).delete()

        for order_num, slide in enumerate(slide_list):
            Slide.objects.create(
                presentation=presentation,
                slide_order=order_num,
                markdown=slide
            )

    @staticmethod
    class Meta:
        model = Presentation
        fields = ['subject', 'markdown', 'is_public', "tags"]


class PresentationCreateForm(PresentationBaseForm):
    def save(self, commit=True):
        instance = super(PresentationCreateForm, self).save(commit=False)
        instance.author = self.author
        instance.save()

        self.add_slide_list(instance)
        return instance


class PresentationUpdateForm(PresentationBaseForm):
    def save(self, commit=True):
        instance = super(PresentationUpdateForm, self).save(commit=False)
        instance.subject = self.cleaned_data.get('subject')
        instance.is_public = self.cleaned_data.get('is_public')
        instance.author = self.author
        instance.save()

        self.add_slide_list(instance)
        return instance
