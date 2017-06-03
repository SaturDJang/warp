from django.contrib.auth.mixins import LoginRequiredMixin

from django.http import HttpResponse
from django.http import HttpResponseNotAllowed

from django.core.urlresolvers import reverse, reverse_lazy
from django.views.generic import DeleteView
from django.views.generic import UpdateView
from django.views.generic import CreateView
from django.views.generic import DetailView
from django.views.generic import ListView

from pure_pagination import PaginationMixin

from warp.users.models import User

from .forms import PresentationCreateForm, PresentationUpdateForm
from .models import Presentation
from .behaviors import AuthorRequiredMixin


class PresentationList(PaginationMixin, ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    ordering = ['-pk']

    def get_queryset(self):
        return super(PresentationList, self).get_queryset().public()


class PresentationDetail(DetailView):
    model = Presentation
    context_object_name = 'presentation'

    def get_context_data(self, **kwargs):
        context = super(PresentationDetail, self).get_context_data()
        self.object.view()
        return context


class PresentationCreate(LoginRequiredMixin, CreateView):
    model = Presentation
    form_class = PresentationCreateForm

    def get_context_data(self, **kwargs):
        context = super(PresentationCreate, self).get_context_data()
        context['action_url'] = reverse('presentation:create')
        context['submit_button_text'] = 'Create'
        return context

    def form_valid(self, form):
        form.user = self.request.user
        form.cleaned_data['author'] = User.objects.get(username=form.user.username)
        return super(PresentationCreate, self).form_valid(form)


class PresentationUpdate(AuthorRequiredMixin, LoginRequiredMixin, UpdateView):
    model = Presentation
    form_class = PresentationUpdateForm

    def get_context_data(self, **kwargs):
        context = super(PresentationUpdate, self).get_context_data()
        context['action_url'] = reverse('presentation:update', kwargs={'pk': self.object.pk})
        context['submit_button_text'] = 'Update'
        return context

    def form_valid(self, form):
        form.user = self.request.user
        return super(PresentationUpdate, self).form_valid(form)


class PresentationDelete(AuthorRequiredMixin, LoginRequiredMixin, DeleteView):
    model = Presentation
    success_url = reverse_lazy("presentation:list")


def like_presentation(request, pk):
    if request.method == 'PUT':
        presentation = Presentation.objects.get(pk=pk)
        is_like = presentation.like_toggle(request.user)
        return HttpResponse(status=200, content=is_like)

    return HttpResponseNotAllowed(["PUT"])
