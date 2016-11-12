$(function () {
    var before_value = '';
    $('#create_html').submit(function () {
        $('#id_html').val(marked($('#id_markdown').val()));
    });
    $('.preview-btn').click(function () {
        $('.preview').html(marked($('#id_markdown').val()));
    });

    var markdown_div = $('#id_markdown'),
        markdown_event;
    // onFocus 이벤트 발생 시 setInterval을 통해 _onWatch를 실행
    markdown_div.focus(function(e) {
        markdown_event = setInterval($.proxy(function () {
            _onWatch();
        }), 200);
    });

    markdown_div.blur(function(e){
        if(markdown_div) {
            clearInterval(markdown_event);
        }
    });

    function _onWatch() {
        // 이전 값과 현재 값이 다르면 필요한 액션 수행
        var currentValue = markdown_div.val();
        if (before_value !== currentValue) {
            before_value = currentValue;             // 현재 값 저장
            $('.preview').html(marked($('#id_markdown').val()));
        }
    }
});
