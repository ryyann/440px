/* eslint-disable no-shadow, no-console */

// store.js
// Data store which will trigger re-render on
// updates to data.

import { routerMiddleware } from './router';
import reducer, { initialState } from '../reducer';

export const INITIAL = '__INITIAL__';
export const MIDDLEWARE_APPLIED = '__MIDDLEWARE_APPLIED__';

function getStore(initialReducer, initialState) {
  let reducer = initialReducer;

  // Apply initial state
  let state = reducer(initialState || {}, { type: INITIAL });

  // Keep reference to app (see attachStore below)
  let app = () => null;

  // Store updater function, takes a Flux Standard Action
  // and passes it to reducer
  const dispatch = (action = { type: '__NULL__' }) => {
    if (!app) {
      throw new Error('Store is not fully configured, please call method addState');
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Dispatching...', action);
    }
    const newState = reducer(state, action);
    if (newState !== state) {
      state = newState;
      console.log('Next state', state);
      app(state, dispatch);
    }
  };

  // Applies middleware to store
  const applyMiddleware = (...middleware) => {
    reducer = middleware.reduce((next, middleware) =>
      (state, action) => middleware(next, state, action, dispatch), reducer);
    dispatch({ type: MIDDLEWARE_APPLIED, payload: middleware.map(m => m.name) });
  };

  const attachStore = (newApp) => {
    app = newApp;
    return app(state, dispatch);
  };

  function withState(component) {
    return (...args) => component(state, dispatch, ...args);
  }

  const replaceReducer = (newReducer) => {
    reducer = newReducer;
  };

  return { attachStore, replaceReducer, dispatch, withState, applyMiddleware };
}

const store = getStore(reducer, initialState);
store.applyMiddleware(routerMiddleware);

export const withState = store.withState;
export const attachStore = store.attachStore;

export default store;

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('../reducer', () => import('../reducer').then(newReducer =>
//     store.replaceReducer(newReducer.default),
//   ));
// }

