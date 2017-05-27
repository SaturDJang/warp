/* global window, $, marked, resizeSlides, mdElemsToHtmlElems */

$(() => {
  mdElemsToHtmlElems('.preview');
  $('.slide').css('visibility', 'visible');

  resizeSlides(false, $('.preview'));
  $(window).resize(() => {
    resizeSlides(false, $('.preview'));
  });
});
