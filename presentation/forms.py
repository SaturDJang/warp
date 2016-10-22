from django import forms


class PresentationCreateForm(forms.Form):
    subject = forms.CharField(max_length=50)
    markdown = forms.CharField(
        widget=forms.Textarea()
    )
    html = forms.CharField(label="", widget=forms.Textarea(
        attrs={
            "hidden": "true"
        }
    ))
    is_public = forms.BooleanField(initial=True)
