(function () {
  [].forEach.call(document.querySelectorAll('[data-section="z-index-visualizer"]'), el => {
    el.querySelector('span').onclick = null;
    el.parentElement.removeChild(el);
  });
}());
