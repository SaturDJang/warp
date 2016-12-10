$(() => {
  'use strict';
  const $markdown_div = $('#id_markdown');
  const $preview = $('.preview');
  const $html_div = $('#id_html');
  const $create_form = $('#create_html');
  let before_value = '';
  let markdown_event;
  let markdown_content = '';
  let markdown_slides = [];

  $create_form.submit(() => {
    $html_div.val(marked($markdown_div.val()));
  });

  // onFocus 이벤트 발생 시 setInterval을 통해 _onWatch를 실행
  $markdown_div.focus(e => {
    markdown_event = setInterval($.proxy(() => {
      _onWatch();
    }), 200);
  });

  $markdown_div.blur(e => {
    if ($markdown_div) {
      clearInterval(markdown_event);
    }
  });

  function _onWatch() {
    'use strict';

    // 이전 값과 현재 값이 다르면 필요한 액션 수행
    let currentValue = $markdown_div.val();
    if (before_value !== currentValue) {

      // 현재 값 저장
      before_value = currentValue;

      markdown_content = $markdown_div.val();
      markdown_slides = markdown_content.split(/={5,}/);

      $preview.html('');
      markdown_slides.forEach((v, i) => {
        $preview.append(`<div class="callout secondary">${marked(v)}</div>`);
      });
    }
  }

  $('.usage-toggle-btn').click(e => {
    const $this = $(this);
    const current = $this.text();

    if(current === 'Show') {
      $this.text('Hide');
    } else {
      $this.text('Show');
    }

    $(".usage-sidebar").animate({width:'toggle'}, 50);
  });
});
