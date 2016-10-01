from django.views.generic import ListView

from .models import Presentation


# Create your views here.


class PresentationList(ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    template_name = 'presentation/presentation_list.html'
