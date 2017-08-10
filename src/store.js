// store.js
// configures store singleton and exports store
// functions for use by components

import getStore from './lib/getStore';
import { routerMiddleware } from './lib/router';
import reducer, { initialState } from './reducer';

// configure store
const store = getStore(reducer, initialState);
store.applyMiddleware(routerMiddleware);

// export store methods
export const withState = store.withState;
export const withDispatch = store.withDispatch;
export const connect = store.connect;
export const attachStore = store.attachStore;

export default store;

// hot reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', () => import('./reducer').then(newReducer =>
    store.replaceReducer(newReducer.default),
  ));
}
