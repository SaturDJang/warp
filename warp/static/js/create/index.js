/* global window, $, marked, vex, ace, UsageButton, preview, document, location */
const RATIO = {
  h1: 0.20,
  h2: 0.17,
  h3: 0.14,
  h4: 0.11,
  h5: 0.08,
  p: 0.05,
  li: 0.05,
  ul: 0.05,
  ol: 0.05
};

const SLIDE_RATIO = 0.75;
const PADDING_RATIO = 0.05;
const MARGIN_RATIO = 0.01;

$(() => {
  const editor = ace.edit('markdown_editor');
  const aceSession = editor.getSession();

  const imageResiger = (that, naturalWidth, previewWidth) => {
        if (naturalWidth > previewWidth) {
          $(that).css('width', `${previewWidth}px`);
      } else {
          $(that).css('width', `${previewWidth * 0.3}px`);
      }
  };

  const resizeSlides = () => {
    const $slide = $('.slide');
    const hArray = ["h1", "h2", "h3", "h4", "h5", "p", "li", "ul", "ol"];
    const $previewWidth = $('.preview').width();
    const previewWidthRatioApply = $previewWidth * SLIDE_RATIO;
    $slide.outerHeight(previewWidthRatioApply);
    $slide.css('padding', `${$previewWidth * PADDING_RATIO}px`);
    const $img = $('.slide p img');
    $img.each(function (index, element) {
      $(element).get(0).onload = function() {
        imageResiger(this, this.naturalWidth, $previewWidth)
      };
      imageResiger(element, this.naturalWidth , $previewWidth)
    });
    hArray.forEach(size => {
      const $font = $(`.slide ${size}`);
      $font.css('font-size', `${previewWidthRatioApply * RATIO[size]}px`);
      $font.css('margin-bottom', `${previewWidthRatioApply * MARGIN_RATIO}px`);
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

    document.getElementById('id_markdown').value = editor.getValue();
  };

  const usageButton = new UsageButton();
  usageButton.init();

  editor.setTheme('ace/theme/tomorrow_night_bright');
  aceSession.setMode('ace/mode/markdown_warp');
  editor.renderer.setShowGutter(false);
  editor.on('change', md2html);
  editor.on('changeSelection', () => {
    preview.syncWithEditorCaret(editor);
  });

  resizeSlides();
  $(window).resize(resizeSlides);
});
