/* global $, marked, window, resizeSlides */

$(() => {
  const $slides = $('.slides');

  // Convert markdown contents to html
  $slides.find('div').each((i, elem) => {
    const md = elem.textContent;
    const html = marked(md, { sanitize: true });
    elem.innerHTML = html; // eslint-disable-line
  });

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
