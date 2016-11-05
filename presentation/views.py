from django.core.urlresolvers import reverse_lazy
from django.views.generic import FormView
from django.views.generic import ListView

from warp.users.models import User
from .forms import PresentationCreateForm
from .models import Presentation


class CreatePresentation(FormView):
    form_class = PresentationCreateForm
    template_name = 'presentation/presentation_create.html'
    context_object_name = 'presentation_form'
    success_url = reverse_lazy('presentation:list')

    def form_valid(self, form):

        p = Presentation(subject=form.cleaned_data['subject'],
                         author=self.request.user,
                         markdown=form.cleaned_data['markdown'],
                         html='abc',  # TODO
                         is_public=form.cleaned_data['is_public'],
                         )
        p.save()
        return super(CreatePresentation, self).form_valid(form)


class PresentationList(ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    template_name = 'presentation/presentation_list.html'
