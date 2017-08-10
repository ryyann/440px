// renderer.js
// component renderer. takes an object representing
// the component tree and creates the corresponding
// DOM elements.

// Example Component
//
// function dumbComponent() {
//   return {
//     type: 'div',                    // HTML element type
//     id: 'component'                 // Element id
//     className: 'dumb-div',          // CSS class
//     attributes: [                   // Element attributes to apply
//       ['data-dumb', 'i\'m dumb']    // [attribute: String, value: String]
//     ],
//     listeners: [                    // Event listeners to apply
//       ['click', () =>               // [eventName: String, handler: Function]
//         console.log('clicked')
//       ],
//     ],
//     children: [                     // Child elements will be recursively rendered
//       'some text',                  // text elements do not need to be an object
//       {
//         type: 'span',               // nested elements
//         children: ['i\'m nested']
//       },
//       null,                         // null elements will not be recursively attached
//     ],
//   };
// }
//

// remove null values from an array
const noNull = arr => arr.filter(a => a !== null);

export default function render(element, cb) {
  // if this is the root element, when passed
  // to app.js this will not render
  if (element === null) {
    return null;
  }

  // if the element has already been rendered,
  // return it immediately
  if (element instanceof HTMLElement) {
    return element;
  }

  // create a text element
  if (typeof element === 'string') {
    const el = document.createTextNode(element);
    return cb ? cb(el) : el;  // perform additional actions on the text element
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

  // assign id
  if (id) {
    el.id = id;
  }

  // apply class name
  if (className) {
    el.className = className;
  }

  // apply attributes
  if (attributes && attributes.length) {
    noNull(attributes).forEach(([attribute, value]) => {
      el.setAttribute(attribute, value);
    });
  }

  // apply listeners
  if (listeners && listeners.length) {
    noNull(listeners).forEach(([event, callback]) => {
      el.addEventListener(event, callback);
    });
  }

  // recursively iterate over children
  if (children && children.length) {
    children.forEach((child) => {
      const rendered = render(child);
      if (rendered) {
        el.appendChild(rendered); // attach to the current element
      }
    });
  }

  // perform additional actions to the element
  return cb ? cb(el) : el;
}
