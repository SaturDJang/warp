/* global window, $, marked, vex, ace, UsageButton, document, location, $markdownDiv */

$(() => {
  const editor = ace.edit('id_markdown');
  const aceSession = editor.getSession();

  const md2html = () => {
    const markdownContent = editor.getValue();
    const markdownSlides = markdownContent.split(/={5,}/);
    const $preview = $('.preview');

    $preview.html('');
    markdownSlides.forEach((v, i) => {
      $preview.append(`<div class="callout secondary slide data-slide-${i}">${marked(v)}</div>`);
    });
  };

  $('#create_html').submit((e) => {
    const mv = $markdownDiv.val();
    const subject = $('#id_subject').val();
    const isPublic = document.querySelector('#id_is_public').checked;
    const slideList = mv.split(/={5,}/g).map((v, i) => ({
      slide_order: i,
      markdown: v.trim(),
      html: marked(v.trim()),
    }));

    const presentation = {
      subject,
      is_public: isPublic,
      slide_list: slideList,
    };

    $.ajax({
      url: 'create',
      method: 'POST',
      data: presentation,
    }).done(() => {
      location.href = '/';
    }).error((xhr, st, err) => {
      console.log(xhr);
      console.error(err);
    });

    e.preventDefault();
  });

  const usageButton = new UsageButton();
  usageButton.init();

  editor.setTheme('ace/theme/chrome');
  aceSession.setMode('ace/mode/markdown');
  editor.renderer.setShowGutter(false);
  editor.on('change', md2html);
  editor.on('changeSelection', () => {
    /*
    Below is the slide calculation rule.
    The separation bar is considered as a start marker of a new slide(inclusive).
    For example,

    fasdfdfasf --> 1slide
    ========== --> 2slide
    asdffasfsd --> 2slide
    ========== --> 3slide
    adfasdfadf --> 3slide
    */
    const currentRow = editor.getCursorPosition().row;
    let slideIndex = 0;
    const lines = aceSession.getLines(0, aceSession.getLength()).map((line, row) => {
      if (line.match(/={5,}/)) {
        slideIndex += 1;
      }
      return {
        text: line,
        slide: slideIndex,
        row,
      };
    });

    const currentSlideIndex = lines[currentRow].slide;
    const currentSlide = document.querySelector(`.data-slide-${currentSlideIndex}`);
    const container = currentSlide.parentElement;

    if (!isFullyVisibleSlide(currentSlide, currentSlideIndex)) {
      container.scrollTop = scrollTopCenterVisible(currentSlide, currentSlideIndex);
    }
  });
});

function isFullyVisibleSlide(currentSlide, slideIndex) {
  const slideNum = slideIndex + 1;
  const $currentSlide = $(currentSlide);
  const slideOuterHeight = $currentSlide.outerHeight(true);
  const separatorHeight = slideOuterHeight - $currentSlide.outerHeight(false);
  const currentSlideTop = slideOuterHeight * (slideNum - 1);
  const currentSlideBottom = (slideOuterHeight * slideNum) - separatorHeight;
  const container = currentSlide.parentElement;
  const visibleTop = container.scrollTop;
  const visibleBottom = visibleTop + $(container).height();
  return currentSlideBottom <= visibleBottom && currentSlideTop >= visibleTop;
}

function scrollTopCenterVisible(currentSlide, slideIndex) {
  const slideNum = slideIndex + 1;
  const $currentSlide = $(currentSlide);
  const slideOuterHeight = $currentSlide.outerHeight(true);
  const container = currentSlide.parentElement;
  return (slideOuterHeight * (slideNum - 1)) - (($(container).height() - slideOuterHeight) / 2);
}
