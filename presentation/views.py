from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse
from django.http import HttpResponseForbidden
from django.views.generic import CreateView
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import UpdateView
from pure_pagination import PaginationMixin

from warp.users.models import User
from .forms import PresentationCreateForm, PresentationUpdateForm
from .models import Presentation


class PresentationList(PaginationMixin, ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    ordering = ['-pk']


class PresentationDetail(DetailView):
    model = Presentation
    context_object_name = 'presentation'


class PresentationCreate(LoginRequiredMixin, CreateView):
    model = Presentation
    form_class = PresentationCreateForm
    template_name_suffix = '_create'

    def get_context_data(self, **kwargs):
        context = super(PresentationCreate, self).get_context_data()
        context['action_url'] = reverse('presentation:create')
        context['submit_button_text'] = 'Create'
        return context

    def form_valid(self, form):
        form.user = self.request.user
        form.cleaned_data['author'] = User.objects.get(username=form.user.username)
        return super(PresentationCreate, self).form_valid(form)


class PresentationUpdate(LoginRequiredMixin, UpdateView):
    model = Presentation
    form_class = PresentationUpdateForm
    template_name_suffix = '_create'

    def get(self, request, *args, **kwargs):
        if self.get_object().author != request.user:
            return HttpResponseForbidden()
        return super(PresentationUpdate, self).get(request)

    def get_context_data(self, **kwargs):
        context = super(PresentationUpdate, self).get_context_data()
        context['action_url'] = reverse('presentation:update', kwargs={'pk': self.object.pk})
        context['submit_button_text'] = 'Update'
        return context

    def form_valid(self, form):
        form.user = self.request.user
        return super(PresentationUpdate, self).form_valid(form)
