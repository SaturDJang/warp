from django.views.generic import DetailView
from django.shortcuts import redirect, render
from haystack.generic_views import SearchView


from pure_pagination import PaginationMixin

from .forms import PresentationCreateForm, PresentationSearchForm
from .models import Presentation, Slide


class PresentationList(PaginationMixin, SearchView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    ordering = ['-pk']
    form_class = PresentationSearchForm

    template_name = 'presentation/presentation_list.html'

    def get_queryset(self):
        queryset = super(PresentationList, self).get_queryset()
        # further filter queryset based on some set of criteria
        return queryset.all()

    def get_context_data(self, *args, **kwargs):
        context = super(PresentationList, self).get_context_data(*args, **kwargs)
        # do something
        return context




class PresentationDetail(DetailView):
    model = Presentation
    context_object_name = 'presentation'


def presentation_create(request):
    form = PresentationCreateForm(request.POST)

    if request.method == 'POST':
        if form.is_valid():
            presentation = Presentation.objects.create(
                subject=form.cleaned_data.get('subject'),
                author=request.user,
                is_public=form.cleaned_data.get('is_public')
            )

            slide_list = request.POST.getlist('slide_list[]', [])

            for slide in slide_list:
                Slide.objects.create(
                    presentation=presentation,
                    slide_order=slide['slide_order'],
                    markdown=slide['markdown'],
                    html=slide['html'],
                )
            return redirect('presentation:list')

    context = {'form': form}

    return render(request, 'presentation/presentation_create.html', context)
