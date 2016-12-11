from django.views.generic import DetailView
from django.views.generic import ListView
from django.shortcuts import redirect, render

from .forms import PresentationCreateForm
from .models import Presentation, Slide


class PresentationList(ListView):
    model = Presentation
    paginate_by = 9
    context_object_name = 'presentations'


class PresentationDetail(DetailView):
    model = Presentation
    context_object_name = 'presentation'
    template_name = 'presentation/presentation_list.html'


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

            return redirect('list')

    context = {'form': form}

    return render(request, 'presentation/presentation_create.html', context)

