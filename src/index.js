/* eslint-disable no-shadow, import/prefer-default-export */

// index.js
// App entrypoint

import { attachStore } from './store';
import app from './app';

// babili dead code elimination will remove blocks
// wrapped with this in production
const DEV = process.env.NODE_ENV === 'development';

// connect data store and attach app
// to DOM at node provided in HTML
const attach = (app) => {
  const root = document.getElementById('root');
  if (DEV) {
    const main = root.children[0];
    if (main) {
      main.remove();
    }
  }
  attachStore(app(root));
};

attach(app);

// enable hot module reloading
if (DEV && module.hot) {
  module.hot.accept('./app', () => import('./app').then((newApp) => {
    attach(newApp.default);
  }));
}
