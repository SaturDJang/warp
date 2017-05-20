/* global window, $, marked, resizeSlides, mdElemsToHtmlElems */

$(() => {
  mdElemsToHtmlElems('.preview');
  $('.slide').css('visibility', 'visible');

  resizeSlides(false);
  $(window).resize(() => {
    resizeSlides(false);
  });
});
