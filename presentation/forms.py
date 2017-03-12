from django import forms
from haystack.forms import SearchForm


class PresentationSearchForm(SearchForm):

    def search(self):
        # First, store the SearchQuerySet received from other processing.
        sqs = super(SearchForm, self).search()

        if not self.is_valid():
            return self.no_query_found()

        return sqs


class PresentationCreateForm(forms.Form):
    subject = forms.CharField(max_length=50, widget=forms.TextInput(attrs={
        'class': 'input-group-field',
    }))
    markdown = forms.CharField(
        widget=forms.Textarea(),
        required=False
    )
    is_public = forms.BooleanField(initial=True, required=False)
