/* global window, $, marked, vex, ace, Watcher, UsageButton, document, location, $markdownDiv */

$(() => {
  window.$markdownDiv = $('#id_markdown');
  const editor = ace.edit('id_markdown');
  const md2html = () => {
    const markdownContent = editor.getValue();
    const markdownSlides = markdownContent.split(/={5,}/);
    const $preview = $('.preview');

    $preview.html('');
    markdownSlides.forEach((v) => {
      $preview.append(`<div class="callout secondary slide">${marked(v)}</div>`);
    });
  };

  // const watcher = new Watcher();
  // watcher.watch(md2html);

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
  editor.getSession().setMode('ace/mode/markdown');
  editor.renderer.setShowGutter(false);
  editor.on('change', md2html());
});
