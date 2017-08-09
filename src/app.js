import getRouter from './lib/router';
import render from './lib/renderer';
import routes from './routes';
import './app.css';

const router = getRouter(routes);

// Keep a reference to `<main id="app">` for re-render
const main = document.createElement('main');
main.id = 'app';

export default function app(state) {
  // when app is re-rendered, clear any children or text nodes
  if (main.children.length > 0 || main.textContent.length > 0) {
    Array.prototype.slice.call(main.children) // HTMLCollection is array-like
    .map(item => item.remove());
    main.textContent = '';
  }

  // apply state to router and render element tree
  const renderedApp = render(router(state));

  // attach app to <main>
  main.appendChild(renderedApp);

  return main;
}
