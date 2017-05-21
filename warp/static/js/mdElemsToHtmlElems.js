/* global window, global, $, marked */

window.mdElemsToHtmlElems = (slidesWrapperSelector) => {
  // Convert markdown contents to html
  $(slidesWrapperSelector).find('div').each((i, elem) => {
    const md = elem.textContent;
    const html = marked(md, { sanitize: true });
    elem.innerHTML = html; // eslint-disable-line
  });
};
