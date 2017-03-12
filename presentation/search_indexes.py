from haystack import indexes
from .models import Presentation


class PresentationIndex(indexes.SearchIndex, indexes.Indexable):
    pk = indexes.IntegerField()
    text = indexes.CharField(document=True)
    subject = indexes.CharField()
    author = indexes.CharField(model_attr='author')
    is_public = indexes.BooleanField()

    def get_model(self):
        return Presentation

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(is_public=True)

    def prepare_text(self, obj):
        markdown_text = ""
        for slide in obj.slides.all():
            markdown_text += slide.markdown
        return markdown_text

