const noNull = arr => arr.filter(a => a !== null);

export default function render(element, cb) {
  if (element === null) {
    return null;
  }

  if (element instanceof HTMLElement) {
    return element;
  }

  if (typeof element === 'string') {
    const el = document.createTextNode(element);
    return cb ? cb(el) : el;
  }

  const {
    type,
    id,
    className,
    attributes,
    listeners,
    children,
  } = element;

  if (!type) {
    throw new Error('Invalid element, must either be a string or an object with a valid HTML element type property');
  }

  const el = document.createElement(type);

  if (id) {
    el.id = id;
  }

  if (className) {
    el.className = className;
  }

  if (attributes && attributes.length) {
    noNull(attributes).forEach(([attribute, value]) => {
      el.setAttribute(attribute, value);
    });
  }

  if (listeners && listeners.length) {
    noNull(listeners).forEach(([event, callback]) => {
      el.addEventListener(event, callback);
    });
  }

  if (children && children.length) {
    children.forEach((child) => {
      const rendered = render(child);
      if (rendered) {
        el.appendChild(rendered);
      }
    });
  }

  return cb ? cb(el) : el;
}
