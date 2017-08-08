import getRouter from './lib/router';
import render from './lib/renderer';
import routes from './routes';

const router = getRouter(routes);

// We keep a reference to `<main id="app">` for
// future renders
const main = document.createElement('main');
main.id = 'app';

export default function app(state, dispatch) {
  // when app is re-rendered, clear any children or text nodes
  if (main.children.length > 0) {
    for (let i = 0; i < main.children.length - 1; i += 1) {
      main.children.item(i).remove();
    }
  }
  if (main.textContent.length > 0) {
    main.textContent = '';
  }

  // apply state to router and render element tree
  const renderedApp = render(router(state, dispatch));

  // attach app to <main>
  main.appendChild(renderedApp);

  return main;
}
