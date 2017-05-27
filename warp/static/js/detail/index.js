/* global $, marked, window, resizeSlides, mdElemsToHtmlElems */

$(() => {
  const slidesSelector = '.slides';
  const $slides = $(slidesSelector).children();

  let currentSlideIndex = 0;
  let $currentSlide;

  function slideMover(idx) {
    $slides.css('display', 'none');
    $currentSlide = $slides.eq(idx);
    $currentSlide.css('display', 'flex');
  }

  mdElemsToHtmlElems(slidesSelector);

  $slides.css('display', 'none');
  $currentSlide = $slides.eq(currentSlideIndex);
  $currentSlide.css('display', 'flex');

  $('#prev-btn').click(() => {
    currentSlideIndex -= 1;
    if (currentSlideIndex < 0) currentSlideIndex = 0;
    slideMover(currentSlideIndex);
  });
  $('#next-btn').click(() => {
    currentSlideIndex += 1;
    if (currentSlideIndex > $slides.length - 1) currentSlideIndex = $slides.length - 1;
    slideMover(currentSlideIndex);
  });

  resizeSlides(true, $('div#normal-view'));
  $(window).resize(() => {
    resizeSlides(true, $('div#normal-view'));
  });
});
