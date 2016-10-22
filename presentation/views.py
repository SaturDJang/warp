from django.views.generic import ListView, CreateView

from .models import Presentation
from .forms import PresentationCreateForm


# Create your views here.
class CreatePresentation(CreateView):
    form_class = PresentationCreateForm
    template_name = 'presentation/presentation_create.html'
    context_object_name = 'presentation_form'


class PresentationList(ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    template_name = 'presentation/presentation_list.html'
