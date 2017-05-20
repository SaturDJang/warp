from django.core.urlresolvers import reverse_lazy
from django.views.generic import CreateView
from django.views.generic import DetailView
from django.views.generic import ListView

from django.contrib.auth.mixins import LoginRequiredMixin
from pure_pagination import PaginationMixin

from warp.users.models import User
from .forms import PresentationCreateForm
from .models import Presentation


class PresentationList(PaginationMixin, ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    ordering = ['-pk']

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.select_related('author')


class PresentationDetail(DetailView):
    model = Presentation
    context_object_name = 'presentation'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.select_related('author')


class PresentationCreate(LoginRequiredMixin, CreateView):
    model = Presentation
    form_class = PresentationCreateForm
    success_url = reverse_lazy('presentation:list')
    template_name_suffix = '_create'

    def form_valid(self, form):
        form.user = self.request.user
        form.cleaned_data['author'] = User.objects.get(username=form.user.username)
        return super(PresentationCreate, self).form_valid(form)
