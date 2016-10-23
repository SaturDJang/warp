from django.views.generic import FormView
from django.views.generic import ListView

from .forms import PresentationCreateForm
from .models import Presentation


class CreatePresentation(FormView):
    form_class = PresentationCreateForm
    template_name = 'presentation/presentation_create.html'
    context_object_name = 'presentation_form'
    success_url = '/list'

    def form_valid(self, form):
        p = Presentation(subject=form.cleaned_data['subject'],
                         author='Tester',
                         markdown=form.cleaned_data['markdown'],
                         html=form.cleaned_data['html'],
                         is_public=form.cleaned_data['is_public'],
                         )
        p.save()
        return super(CreatePresentation, self).form_valid(form)


class PresentationList(ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    template_name = 'presentation/presentation_list.html'
