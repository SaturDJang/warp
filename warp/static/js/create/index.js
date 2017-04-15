/* global window, $, marked, vex, ace, UsageButton, preview, document, location */

$(() => {
  const editor = ace.edit('markdown_editor');
  const aceSession = editor.getSession();

  const md2html = () => {
    const markdownContent = editor.getValue();
    const markdownSlides = markdownContent.split(/={5,}/);
    const $preview = $('.preview');

    $preview.html('');
    markdownSlides.forEach((v, i) => {
      $preview.append(`<div class="callout secondary slide data-slide-${i}">${marked(v)}</div>`);
    });

    document.getElementById('id_markdown').value = editor.getValue();
  };

  const usageButton = new UsageButton();
  usageButton.init();

  editor.setTheme('ace/theme/chrome');
  aceSession.setMode('ace/mode/markdown_warp');
  editor.renderer.setShowGutter(false);
  editor.on('change', md2html);
  editor.on('changeSelection', () => {
    preview.syncWithEditorCaret(editor);
  });
});
