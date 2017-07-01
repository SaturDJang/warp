/* global $, marked, window, resizeSlides, mdElemsToHtmlElems, screenfull */

$(() => {
  const slidesSelector = '.slides';
  const $slides = $('.slide');

  let currentSlideIndex = 0;
  let $currentSlide;

  function slideMover(idx) {
    $slides.css('display', 'none');
    $slides.removeClass('active');
    $currentSlide = $slides.eq(idx);
    $currentSlide.css('display', 'flex');
    $currentSlide.addClass('active');
  }

  function goToPrevSlide() {
    currentSlideIndex -= 1;
    if (currentSlideIndex < 0) currentSlideIndex = 0;
    slideMover(currentSlideIndex);
  }

  function goToNextSlide() {
    currentSlideIndex += 1;
    if (currentSlideIndex > $slides.length - 1) currentSlideIndex = $slides.length - 1;
    slideMover(currentSlideIndex);
  }

  mdElemsToHtmlElems(slidesSelector);
  $slides.eq(0).addClass('active');

  $slides.css('display', 'none');
  $slides.css('visibility', 'visible');
  $currentSlide = $slides.eq(currentSlideIndex);
  $currentSlide.css('display', 'flex');

  $('#prev-btn').click(() => {
    goToPrevSlide();
  });
  $('#next-btn').click(() => {
    goToNextSlide();
  });
  $('#prev-touch').click(() => {
    goToPrevSlide();
  });
  $('#next-touch').click(() => {
    goToNextSlide();
  });

  $(window).keyup((e) => {
    const keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };
    if (e.which === keys.left || e.which === keys.up) {
      goToPrevSlide();
    } else if (e.which === keys.right || e.which === keys.down) {
      goToNextSlide();
    }
  });

  if (screenfull.enabled) {
    screenfull.onchange(() => {
      if (screenfull.isFullscreen) {
        $slides.height(window.screen.height);
        $slides.width(window.screen.height * 1.333333);
        resizeSlides(true, $('div#normal-view'));
      } else {
        $slides.css('height', '');
        $slides.css('width', '');
      }
    });
  } else {
    $('#full-screen-btn').hide();
  }
  $('#full-screen-btn').click(() => {
    if (screenfull.enabled) {
      screenfull.request($(slidesSelector)[0]);
    }
  });

  resizeSlides(true, $('div#normal-view'));
  let prevWindowWidth = $(window).width();
  $(window).resize(() => {
    if ($(window).width() === prevWindowWidth) {
      return;
    }
    prevWindowWidth = $(window).width();
    resizeSlides(true, $('div#normal-view'));
  });
});

