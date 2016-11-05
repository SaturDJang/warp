$(function () {
    $('#create_html').submit(function () {
        $('#id_html').val(marked($('#id_markdown').val()));
    });
});
