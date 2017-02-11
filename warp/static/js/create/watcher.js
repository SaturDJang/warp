/* global $, $markdownDiv */
/* eslint no-unused-vars: "off"*/

class Watcher {
  constructor() {
    this.markdownEvent = undefined;
    this.beforeValue = '';
  }

  watch(callback) {
    // onFocus 이벤트 발생 시 setInterval을 통해 _onWatch를 실행
    $markdownDiv.focus(() => {
      this.markdownEvent = setInterval($.proxy(() => {
        const currentValue = $markdownDiv.val();
        if (this.beforeValue !== currentValue) {
          // 현재 값 저장
          this.beforeValue = currentValue;

          callback();
        }
      }), 200);
    });

    $markdownDiv.blur(() => {
      if ($markdownDiv) {
        clearInterval(this.markdownEvent);
      }
    });
  }
}
