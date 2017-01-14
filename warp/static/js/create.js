/* global $, marked, vex */
$(() => {
  const $markdownDiv = $('#id_markdown');
  const $preview = $('.preview');
  const $htmlDiv = $('#id_html');
  const $createForm = $('#create_html');
  let beforeValue = '';
  let markdownEvent;
  let markdownContent = '';
  let markdownSlides = [];

  function _onWatch() {
    // 이전 값과 현재 값이 다르면 필요한 액션 수행
    const currentValue = $markdownDiv.val();
    if (beforeValue !== currentValue) {
      // 현재 값 저장
      beforeValue = currentValue;

      markdownContent = $markdownDiv.val();
      markdownSlides = markdownContent.split(/={5,}/);

      $preview.html('');
      markdownSlides.forEach((v) => {
        $preview.append(`<div class="callout secondary">${marked(v)}</div>`);
      });
    }
  }

  $createForm.submit(() => {
    $htmlDiv.val(marked($markdownDiv.val()));
  });

  // onFocus 이벤트 발생 시 setInterval을 통해 _onWatch를 실행
  $markdownDiv.focus(() => {
    markdownEvent = setInterval($.proxy(() => {
      _onWatch();
    }), 200);
  });

  $markdownDiv.blur(() => {
    if ($markdownDiv) {
      clearInterval(markdownEvent);
    }
  });
});

$(() => {
  class UsageButton {

    constructor() {
      this.$element = $('.usage-toggle-btn');
      this.command = 'on';
      this.usageContent = $('#usage-content-template').html();
      this.dialog = undefined;
    }

    init() {
      this.$element.click(() => {
        this.toggle();
      });
    }

    showUsage() {
        this.dialog = vex.dialog.alert({
          unsafeMessage: this.usageContent,
          afterClose: () => {
            this.hideUsage();
          }
        });
        this.$element.text('Hide Usage');
        this.command = 'off';
    }

    hideUsage() {
        vex.close(this.dialog);
        this.$element.text('Show Usage');
        this.command = 'on';
    }

    toggle() {
      if (this.command === 'on') {
        this.showUsage();
      } else {
        this.hideUsage();
      }
    }
  }

  const usageButton = new UsageButton();
  usageButton.init();
});
