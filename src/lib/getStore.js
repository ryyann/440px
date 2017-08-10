/* eslint-disable no-shadow, no-console */

// store.js
// Redux/Flux style data store which will trigger re-render on
// updates to data.

export const INITIAL = '__INITIAL__';
export const MIDDLEWARE_APPLIED = '__MIDDLEWARE_APPLIED__';

const DEV = process.env.NODE_ENV === 'development';

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
    if (DEV) {
      console.log('Dispatching...', action);
    }

    // apply reducers to state
    const newState = reducer(state, action);

    // reducers must provide a new object to trigger a re-render
    if (newState !== state) {
      // store reduced state
      state = newState;
      if (DEV) {
        console.log('Next state', state);
      }
      // trigger app render
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
    // initial app render
    return app(state, dispatch);
  };

  // connect a component to state
  const withState = component =>
    (...args) => component(state, ...args);

  // connect a component to dispatch
  const withDispatch = component =>
    (...args) => component(dispatch, ...args);

  // connect a component to state and dispatch
  const connect = component => withDispatch(withState(component));

  const replaceReducer = (newReducer) => {
    reducer = newReducer;
  };

  return { attachStore, replaceReducer, withState, withDispatch, connect, applyMiddleware };
}
