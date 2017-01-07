from django import forms


class PresentationCreateForm(forms.Form):
    subject = forms.CharField(max_length=50, widget=forms.TextInput(attrs={
        'class': 'input-group-field',
    }))
    markdown = forms.CharField(
        widget=forms.Textarea()
    )
    is_public = forms.BooleanField(initial=True)
