$(function () {
    var before_value = '',
        $markdown_div = $('#id_markdown'),
        $preview = $('.preview'),
        $html_div = $('#id_html'),
        $create_form = $('#create_html'),
        markdown_event,
        markdown_content = '',
        markdown_slides = [];

    $create_form.submit(function () {
        $html_div.val(marked($markdown_div.val()));
    });

    // onFocus 이벤트 발생 시 setInterval을 통해 _onWatch를 실행
    $markdown_div.focus(function (e) {
        markdown_event = setInterval($.proxy(function () {
            _onWatch();
        }), 200);
    });

    $markdown_div.blur(function (e) {
        if ($markdown_div) {
            clearInterval(markdown_event);
        }
    });

    function _onWatch() {
        // 이전 값과 현재 값이 다르면 필요한 액션 수행
        var currentValue = $markdown_div.val();
        if (before_value !== currentValue) {
            before_value = currentValue;             // 현재 값 저장

            markdown_content = $markdown_div.val();
            markdown_slides = markdown_content.split(/={5,}/);

            $preview.html('');
            markdown_slides.forEach(function (v, i) {
                $preview.append('<div class="callout secondary">' + marked(v) + '</div>');
            });
        }
    }
});
