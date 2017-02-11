/* global $, marked, vex */
$(() => {
  const $markdownDiv = $('#id_markdown');

  class Watcher {
    constructor() {
      this.$preview = $('.preview');
      this.beforeValue = '';
      this.markdownEvent = undefined;
      this.markdownContent = '';
      this.markdownSlides = [];
    }

    watch() {
      // onFocus 이벤트 발생 시 setInterval을 통해 _onWatch를 실행
      $markdownDiv.focus(() => {
        this.markdownEvent = setInterval($.proxy(() => {
          this.handleWatch();
        }), 200);
      });

      $markdownDiv.blur(() => {
        if ($markdownDiv) {
          clearInterval(this.markdownEvent);
        }
      });
    }

    handleWatch() {
      // 이전 값과 현재 값이 다르면 필요한 액션 수행
      const currentValue = $markdownDiv.val();
      if (this.beforeValue !== currentValue) {
        // 현재 값 저장
        this.beforeValue = currentValue;

        this.markdownContent = $markdownDiv.val();
        this.markdownSlides = this.markdownContent.split(/={5,}/);

        this.$preview.html('');
        this.markdownSlides.forEach((v) => {
          this.$preview.append(`<div class="callout secondary">${marked(v)}</div>`);
        });
      }
    }
  }

  const watcher = new Watcher();
  watcher.watch();
  $('#create_html').submit(() => {
    $('#id_html').val(marked($markdownDiv.val()));
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
        },
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
