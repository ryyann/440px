/* eslint-disable no-shadow, no-console */

// store.js
// Data store which will trigger re-render on
// updates to data.

export const INITIAL = '__INITIAL__';
export const MIDDLEWARE_APPLIED = '__MIDDLEWARE_APPLIED__';

export default function getStore(initialReducer, initialState) {
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
    return app(state);
  };

  const withState = component =>
    (...args) => component(state, ...args);

  const withDispatch = component =>
    (...args) => component(dispatch, ...args);

  const connect = component => withDispatch(withState(component));

  const replaceReducer = (newReducer) => {
    reducer = newReducer;
  };

  return { attachStore, replaceReducer, withState, withDispatch, connect, applyMiddleware };
}
