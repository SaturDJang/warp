from django.views.generic import DetailView
from django.views.generic import ListView
from django.shortcuts import redirect, render

from pure_pagination import PaginationMixin

from .forms import PresentationCreateForm
from .models import Presentation, Slide


class PresentationList(PaginationMixin, ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'
    ordering = ['-pk']


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
