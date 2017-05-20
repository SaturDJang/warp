import re

from django import forms

from .models import Presentation, Slide


class PresentationCreateForm(forms.ModelForm):

    subject = forms.CharField(
        max_length=50, widget=forms.TextInput(attrs={'class': 'input-group-field', }))

    markdown = forms.CharField(widget=forms.HiddenInput(), required=True)
    is_public = forms.BooleanField(initial=True, required=False)

    def save(self, commit=True):
        presentation = Presentation.objects.create(
            subject=self.cleaned_data.get('subject'),
            author=self.user,
            is_public=self.cleaned_data.get('is_public')
        )

        self.add_slide_list(presentation)

        return self.instance

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

    class Meta:
        model = Presentation
        fields = ['subject', 'markdown', 'is_public']
