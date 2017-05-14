/* global window, $, marked, vex, ace, UsageButton, preview, document, location, Prism */

$(() => {
  const editor = ace.edit('id_markdown');
  const aceSession = editor.getSession();

  const resizeImg = (that, naturalWidth, previewWidth) => {
    if (naturalWidth > previewWidth) {
      $(that).css('width', `${previewWidth}px`);
    } else {
      $(that).css('width', `${previewWidth * 0.3}px`);
    }
  };

  const resizeSlides = () => {
    const ZOOMING_RATIO = {
      elems: {
        h1: 0.20,
        h2: 0.17,
        h3: 0.14,
        h4: 0.11,
        h5: 0.08,
        p: 0.04,
        pre: 0.04,
        code: 0.04,
        span: 0.04,
        li: 0.04,
        ul: 0.04,
        ol: 0.04,
      },
      slide: 0.75,
      padding: 0.05,
      margin: 0.01,
    };

    const $slide = $('.slide');
    const $previewWidth = $('.preview').outerWidth();
    const previewWidthRatioApply = $previewWidth * ZOOMING_RATIO.slide;
    $slide.outerHeight(previewWidthRatioApply - ($previewWidth * ZOOMING_RATIO.padding));
    $slide.css('padding', `${$previewWidth * ZOOMING_RATIO.padding}px`);
    $slide.css('margin', `${previewWidthRatioApply * 0.03}px`);

    const $img = $('.slide p img');
    $img.each(function (index, element) {
      $(element).get(0).onload = function () {
        resizeImg(this, this.naturalWidth, $previewWidth);
      };
      resizeImg(element, this.naturalWidth, $previewWidth);
    });

    Object.keys(ZOOMING_RATIO.elems).forEach((elem) => {
      const $font = $(`.slide ${elem}`);
      $font.css('font-size', `${previewWidthRatioApply * ZOOMING_RATIO.elems[elem]}px`);
      $font.css('margin-bottom', `${previewWidthRatioApply * ZOOMING_RATIO.margin}px`);
      $('.slide pre').css('padding', `${previewWidthRatioApply * 0.02}px`);
    });

    // When the screen is resized, the scroll position of preview is also changed,
    // so that user might be disappointed.
    // Because of the above case, we should sync preview with editor cursor on every resizing.
    preview.syncWithEditorCaret(editor);
  };

  const appendSlide = (content, index) => {
    const $preview = $('.preview');
    $preview.append(`<div class="callout secondary slide data-slide-${index}">${marked(content)}</div>`);
  };

  const md2html = () => {
    const markdownContent = editor.getValue();
    const markdownSlides = markdownContent.split(/={5,}/);
    const $preview = $('.preview');

    $preview.html('');
    markdownSlides.forEach((v, i) => {
      appendSlide(v, i);
    });
    Prism.highlightAll(); // highlights code blocks
    resizeSlides();
  };

  $('#create_html').submit((e) => {
    const subject = $('#id_subject').val();
    const isPublic = document.querySelector('#id_is_public').checked;
    const slideList = editor.getValue().split(/={5,}/g).map((v, i) => ({
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

  editor.setTheme('ace/theme/tomorrow_night_bright');
  aceSession.setMode('ace/mode/markdown_warp');
  editor.renderer.setShowGutter(false);
  editor.on('change', md2html);
  editor.on('changeSelection', () => {
    preview.syncWithEditorCaret(editor);
  });

  marked.setOptions({
    langPrefix: 'language-',
  });

  resizeSlides();
  $(window).resize(resizeSlides);
});
