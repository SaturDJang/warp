/* global $, marked, vex, Watcher, UsageButton */
const $markdownDiv = $('#id_markdown');

$(() => {
  const md2html = () => {
    const markdownContent = $markdownDiv.val();
    const markdownSlides = markdownContent.split(/={5,}/);
    const $preview = $('.preview');

    $preview.html('');
    markdownSlides.forEach((v) => {
      $preview.append(`<div class="callout secondary">${marked(v)}</div>`);
    });
  };

  const watcher = new Watcher();
  watcher.watch(md2html);

  $('#create_html').submit(() => {
    $('#id_html').val(marked($markdownDiv.val()));
  });

  const usageButton = new UsageButton();
  usageButton.init();
});
