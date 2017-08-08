import config from '../config';
import { MIDDLEWARE_APPLIED } from './store';

const { BASE_PATH } = config;

export const UPDATE_LOCATION = 'ROUTER_UPDATE_LOCATION';
export const REPLACE_STATE = 'ROUTER_REPLACE_STATE';

export const go = location => ({
  type: UPDATE_LOCATION,
  payload: location,
});

export default function getRouter(routes) {
  return (state, dispatch) =>
    routes.reduce((match, route) => {
      if (match) {
        return match;
      }
      let path;
      if (typeof route.path === 'string') {
        path = new RegExp(`^${BASE_PATH}${route.path}$`);
      }
      if (!(path instanceof RegExp)) {
        throw new Error('Route misconfigured, path must be a string or RegExp');
      }
      if (path.test(state.router.path)) {
        return route.component(state, dispatch);
      }
      return match;
    }, null);
}

function routeReducer(state, action) {
  switch (action.type) {
    case MIDDLEWARE_APPLIED:
      if (action.payload.indexOf('routerMiddleware') !== -1) {
        return Object.assign({}, state, {
          router: {
            path: window.location.pathname.replace(BASE_PATH, ''),
          },
        });
      }
      return state;
    case REPLACE_STATE:
      return action.payload;
    case UPDATE_LOCATION:
      return Object.assign({}, state, {
        router: {
          path: action.payload,
        },
      });
    default:
      return state;
  }
}

export function routerMiddleware(next, state, action, dispatch) {
  const nextState = routeReducer(state, action);
  if (action.type === MIDDLEWARE_APPLIED) {
    history.pushState(nextState, '', `${BASE_PATH}${window.location.pathname}`);
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      const originalState = event.state;
      if (originalState !== null) {
        dispatch({ type: REPLACE_STATE, payload: originalState });
      }
    }, false);
  }

  if (action.type === UPDATE_LOCATION) {
    history.pushState(nextState, '', `${BASE_PATH}${action.payload}`);
  }

  return next(nextState, action);
}
