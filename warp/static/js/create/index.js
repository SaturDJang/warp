/* global window, $, marked, ace, preview, document, Prism, resizeSlides */

$(() => {
  const editor = ace.edit('markdown_editor');
  const aceSession = editor.getSession();
  const idMarkdownValue = document.getElementById('id_markdown').value;
  const existMarkdownValue = document.getElementById('exist_markdown').value;
  if (existMarkdownValue) {
    editor.setValue(existMarkdownValue);
  }

  if (idMarkdownValue) {
    editor.setValue(idMarkdownValue);
  }

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
    resizeSlides(false, $preview);

    document.getElementById('id_markdown').value = editor.getValue();
  };

  editor.setTheme('ace/theme/tomorrow_night_bright');
  aceSession.setMode('ace/mode/markdown_warp');
  editor.renderer.setShowGutter(false);
  md2html();
  editor.on('change', md2html);
  editor.on('changeSelection', () => {
    preview.syncWithEditorCaret(editor);
  });

  marked.setOptions({
    langPrefix: 'language-',
  });

  resizeSlides(false, $('.preview'));
  $(window).resize(() => {
    resizeSlides(false, $('.preview'));

    // When the screen is resized, the scroll position of preview is also changed,
    // so that user might be disappointed.
    // Because of the above case, we should sync preview with editor cursor on every resizing.
    preview.syncWithEditorCaret(editor);
  });
});
