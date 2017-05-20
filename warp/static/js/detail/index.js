/* global $, marked, window, resizeSlides, mdElemsToHtmlElems */

$(() => {
  const slidesSelector = '.slides';
  const $slides = $(slidesSelector);

  mdElemsToHtmlElems(slidesSelector);

  $slides.slick({
    arrows: false,
  });

  $('#prev-btn').click(() => {
    $slides.slick('slickPrev');
  });
  $('#next-btn').click(() => {
    $slides.slick('slickNext');
  });

  resizeSlides(true);
  $(window).resize(() => {
    resizeSlides(true);
  });
});
