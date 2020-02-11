(function () {
  const elements = document.querySelectorAll('[data-section="z-index-visualizer"]');
  [].forEach.call(elements, el => {
    el.querySelector('span').onclick = null;
    el.parentElement.removeChild(el);
  });
}());
