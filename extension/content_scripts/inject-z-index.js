(function () {
  const rgba = (color, alpha) => {
    if (typeof color === 'string' && color[0] === '#') {
      color = parseInt(color.slice(1), 16);
    }

    alpha = alpha == null ? 1 : alpha;

    const r = color >> 16 & 0xff;
    const g = color >> 8 & 0xff;
    const b = color & 0xff;
    const a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;

    return a === 1 || typeof a !== 'number'
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const createLabel = element => {
    const computedStyle = window.getComputedStyle(element);
    const clientRect = element.getBoundingClientRect();
    const position = computedStyle.getPropertyValue('position');
    const zindex = computedStyle.getPropertyValue('z-index');
    const color = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
    const contrast = '#' + (Number('0x' + color.substr(1)).toString(10) > 0xffffff / 2 ? '000000' : 'ffffff');
    const overlay = document.createElement('div');
    const label = document.createElement('span');

    label.textContent = `z-index: ${zindex}`;
    label.title = 'Click to log element';
    label.onclick = () => console.log(element);

    overlay.style.cssText = `
      position: ${position === 'fixed' ? 'fixed' : 'absolute'};
      top: ${clientRect.y}px;
      left: ${clientRect.x}px;
      width: ${clientRect.width}px;
      height: ${clientRect.height}px;
      background-color: ${rgba(color, 0.05)};
      outline: 1px solid ${color};
      z-index: 9999;
    `;

    label.style.cssText = `
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 8px 12px;
      border-radius: 3px;
      white-space: nowrap;
      font-family: monospace;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: normal;
      line-height: 1;
      background-color: ${color};
      color: ${contrast};
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    `;

    overlay.setAttribute('data-section', 'z-index-visualizer');
    overlay.appendChild(label);
    document.body.appendChild(overlay);
  };

  const hasZIndexProperty = el => window.getComputedStyle(el).getPropertyValue('z-index') !== 'auto';

  Array.from(document.querySelectorAll('*')).filter(hasZIndexProperty).forEach(createLabel);
}());
