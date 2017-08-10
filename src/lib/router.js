import config from '../config';
import { MIDDLEWARE_APPLIED } from './getStore';

const { BASE_PATH } = config;

export const UPDATE_LOCATION = 'ROUTER_UPDATE_LOCATION';

let configuredRoutes;
const routeMatches = {};

export const go = location => ({
  type: UPDATE_LOCATION,
  payload: `${BASE_PATH}${location}`,
});

const matchRoutePath = (route, url) => {
  if (!routeMatches[route.path]) {
    const parts = route.path.replace(/^\//, '').split('/');
    const matchString = parts.map((part) => {
      if (part.indexOf(':') === 0) {
        return '([\\w\\d]*)';
      }
      return part;
    }).join('/');
    routeMatches[route.path] = {
      test: new RegExp(`^${BASE_PATH}/${matchString}$`, 'i'),
      routeParams: parts.filter(part => part.indexOf(':') === 0)
                 .map(part => part.replace(/^:/, '')),
    };
  }
  const { test, routeParams } = routeMatches[route.path];
  const match = url.match(test);
  if (!match) {
    return null;
  }
  const urlParams = routeParams.reduce((acc, param, i) =>
    Object.assign(acc, {
      [param]: match[i + 1],
    }),
  {});
  return { component: route.component, params: urlParams };
};

const matchRoute = url =>
  configuredRoutes.reduce((matched, route) => {
    if (matched) {
      return matched;
    }
    return matchRoutePath(route, url);
  }, null);

export default function getRouter(routes) {
  configuredRoutes = routes.map(route =>
    Object.assign(route, {
      path: `${BASE_PATH}${route.path}`,
    }));
  return (state, dispatch) => {
    if (!state.router || !state.router.path) {
      dispatch(go(window.location.pathname));
      return null;
    }
    const matched = matchRoute(state.router.path);
    if (matched) {
      return matched.component();
    }
    return null;
  };
}

function routeReducer(state, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, {
        router: {
          path: action.payload,
          params: matchRoute(`${BASE_PATH}${action.payload}`).params,
        },
      });
    default:
      return state;
  }
}

export function routerMiddleware(next, state, action, dispatch) {
  const nextState = routeReducer(state, action);

  if (action.type === MIDDLEWARE_APPLIED && action.payload.indexOf('routerMiddleware') !== -1) {
    // listen for forward and back button
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      const originalState = event.state;
      if (originalState !== null) {
        dispatch(go(originalState.router.path));
      }
    }, false);
  }

  // update history when route is changed
  if (action.type === UPDATE_LOCATION) {
    history.pushState(nextState, '', action.payload);
  }

  return next(nextState, action);
}
