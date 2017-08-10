import getRouter from './lib/router';
import render from './lib/renderer';
import routes from './routes';
import './app.css';

const router = getRouter(routes);

// Keep a reference to `<main id="app">` for re-render
const main = document.createElement('main');
main.id = 'app';

export default function app(state, dispatch) {
  // apply state to router and render element tree
  const renderedApp = render(router(state, dispatch));

  if (renderedApp === null) {
    return main;
  }

  // when app is re-rendered, clear any children or text nodes
  if (main.childElementCount > 1 || main.textContent.length > 0) {
    Array.prototype.slice.call(main.children) // HTMLCollection is array-like
    .map(item => item.remove());
    main.textContent = '';
  }

  // attach app to <main>
  main.appendChild(renderedApp);

  return main;
}
