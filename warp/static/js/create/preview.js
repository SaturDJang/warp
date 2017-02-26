/* global document, $, window */

!(function () { // eslint-disable-line func-names, no-unused-expressions
  const isFullyVisibleSlide = (currentSlide, slideIndex) => {
    const slideNum = slideIndex + 1;
    const $currentSlide = $(currentSlide);
    const slideOuterHeight = $currentSlide.outerHeight(true);
    const separatorHeight = slideOuterHeight - $currentSlide.outerHeight(false);
    const currentSlideTop = slideOuterHeight * (slideNum - 1);
    const currentSlideBottom = (slideOuterHeight * slideNum) - separatorHeight;
    const container = currentSlide.parentElement;
    const visibleTop = container.scrollTop;
    const visibleBottom = visibleTop + $(container).height();
    return currentSlideBottom <= visibleBottom && currentSlideTop >= visibleTop;
  };

  const scrollTopCenterVisible = (currentSlide, slideIndex) => {
    const slideNum = slideIndex + 1;
    const $currentSlide = $(currentSlide);
    const slideOuterHeight = $currentSlide.outerHeight(true);
    const container = currentSlide.parentElement;
    return (slideOuterHeight * (slideNum - 1)) - (($(container).height() - slideOuterHeight) / 2);
  };

  const syncWithEditorCaret = (editor) => {
    const editorSession = editor.getSession();
    /*
    Below is the slide calculation rule.
    The separation bar is considered as a start marker of a new slide(inclusive).
    For example,

    fasdfdfasf --> 1slide
    ========== --> 2slide
    asdffasfsd --> 2slide
    ========== --> 3slide
    adfasdfadf --> 3slide
    */
    const currentRow = editor.getCursorPosition().row;
    let slideIndex = 0;
    const lines = editorSession.getLines(0, editorSession.getLength()).map((line, row) => {
      if (line.match(/={5,}/)) {
        slideIndex += 1;
      }
      return {
        text: line,
        slide: slideIndex,
        row,
      };
    });

    const currentSlideIndex = lines[currentRow].slide;
    const currentSlide = document.querySelector(`.data-slide-${currentSlideIndex}`);
    const container = currentSlide.parentElement;

    if (!isFullyVisibleSlide(currentSlide, currentSlideIndex)) {
      container.scrollTop = scrollTopCenterVisible(currentSlide, currentSlideIndex);
    }
  };

  this.preview = {
    syncWithEditorCaret,
  };
}).call(window);
