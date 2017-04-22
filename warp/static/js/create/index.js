/* global window, $, marked, vex, ace, UsageButton, preview, document, location */
const RATIO = {
  h1: 0.20,
  h2: 0.17,
  h3: 0.14,
  h4: 0.11,
  h5: 0.08,
  p: 0.05
};

$(() => {
  const editor = ace.edit('markdown_editor');
  const aceSession = editor.getSession();

  const resizeSlides = () => {
    const hArray = ["h1", "h2", "h3", "h4", "h5", "p"];
    const previewWidth = $('.preview').width();
    const previewWidthRatioApply = previewWidth * 0.75;
    $('.slide').height(previewWidth * 0.75);

    hArray.forEach(size => {
      $(`.slide ${size}`).css('font-size', `${previewWidthRatioApply * RATIO[size]}px`);
    });

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

    document.getElementById('id_markdown').value = editor.getValue();
  };

  const usageButton = new UsageButton();
  usageButton.init();

  resizeSlides();
  $(window).resize(resizeSlides);

  editor.setTheme('ace/theme/tomorrow_night_bright');
  aceSession.setMode('ace/mode/markdown_warp');
  editor.renderer.setShowGutter(false);
  editor.on('change', md2html);
  editor.on('changeSelection', () => {
    preview.syncWithEditorCaret(editor);
  });
});
