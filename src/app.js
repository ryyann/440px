/* eslint-disable no-param-reassign */

// app.js
// Provides store to router and attaches
// rendered app to DOM

import getRouter from './lib/router';
import render from './lib/renderer';
import routes from './routes';
import './app.css';

const router = getRouter(routes);

export default function app(root) {
  return (state, dispatch) => {
    // apply state to router and render element tree
    const renderedApp = render(router(state, dispatch));

    if (renderedApp === null) {
      return root;
    }

    // when app is re-rendered, clear any children or text nodes
    if (root.childElementCount > 0 || root.textContent.length > 0) {
      Array.prototype.slice.call(root.children) // HTMLCollection is array-like
                           .map(item => item.remove());
      root.textContent = '';
    }

    // attach app to <div id="root">
    root.appendChild(renderedApp);

    return root;
  };
}
