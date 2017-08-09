import config from '../config';
import { MIDDLEWARE_APPLIED } from './getStore';

const { BASE_PATH } = config;

export const UPDATE_LOCATION = 'ROUTER_UPDATE_LOCATION';
export const REPLACE_STATE = 'ROUTER_REPLACE_STATE';

export const go = location => ({
  type: UPDATE_LOCATION,
  payload: location,
});

const routeMatches = {};

export const matchRoutePath = (route, url) => {
  if (!routeMatches[route.path]) {
    const parts = route.path.replace(/^\//, '').split('/');
    const matchString = parts.map((part) => {
      if (part.indexOf(':') === 0) {
        return '([\\w\\d]*)';
      }
      return part;
    }).join('/');
    routeMatches[route.path] = {
      test: new RegExp(`^${BASE_PATH}/${matchString}$`, 'g'),
      params: parts.filter(part => part.indexOf(':') === 0)
                   .map(part => part.replace(/^:/, '')),
    };
  }
  const match = routeMatches[route.path].test.exec(url);
  if (!match) {
    return false;
  }
  const params = routeMatches[route.path].params.reduce((acc, param, i) => Object.assign(acc, {
    [param]: match[i + 1],
  }), {});
  return { component: route.component, params };
};

export default function getRouter(routes) {
  const configuredRoutes = routes.map(route =>
    Object.assign(route, {
      path: `${BASE_PATH}${route.path}`,
    }));
  return state =>
    configuredRoutes.reduce((routeComponent, route) => {
      if (routeComponent) {
        return routeComponent;
      }
      const match = matchRoutePath(route, state.router.path);
      if (match) {
        return match.component();
      }
      return null;
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
    // push initial state on middleware load
    history.pushState(nextState, '', `${BASE_PATH}${window.location.pathname.replace(BASE_PATH, '')}`);

    // listen for forward and back button
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      const originalState = event.state;
      if (originalState !== null) {
        dispatch({ type: REPLACE_STATE, payload: originalState });
      }
    }, false);
  }

  // update history when route is changed
  if (action.type === UPDATE_LOCATION) {
    history.pushState(nextState, '', `${BASE_PATH}${action.payload}`);
  }

  return next(nextState, action);
}
