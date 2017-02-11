/* global $, marked, vex, Watcher, UsageButton, document, location */
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

  $('#create_html').submit((e) => {
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    $.ajaxPrefilter((options, originalOptions, jqXHR) => {
      jqXHR.setRequestHeader('X-CSRFToken', csrfToken);
    });
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
});
