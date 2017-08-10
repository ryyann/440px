// router.js
// enables single-page-app routing

import config from '../config';
import { MIDDLEWARE_APPLIED } from './getStore';

// If the app is not running at the root path
// eg `example.com/app/` we need the base path
const { BASE_PATH } = config;

// redux-style constant
export const UPDATE_LOCATION = 'ROUTER_UPDATE_LOCATION';

// store routes
let configuredRoutes;

// memoized RegExp's for routes go here
const routeMatches = {};

// redux-style action creator for links
export const go = location => ({
  type: UPDATE_LOCATION,
  payload: `${BASE_PATH}${location}`,
});

// given a route and a url, test if this is a
// match for the URL.
const matchRoutePath = (route, url) => {
  // check to see if we've memoized this route
  if (!routeMatches[route.path]) {
    // remove '/' at head, split into parts
    // '/image/:id' => ['image', ':id']
    const parts = route.path.replace(/^\//, '').split('/');

    // iterate over parts and create a
    // string for the route regex
    const matchString = parts.map((part) => {
      if (part.indexOf(':') === 0) {
        return '([\\w\\d]*)'; // if this is a route parameter, create a capture group
      }
      return part;
    }).join('/');

    // create a RegExp from the match string
    const test = new RegExp(`^${BASE_PATH}/${matchString}$`, 'i');

    // store the parameter names
    const routeParams = parts.filter(part => part.indexOf(':') === 0)
                             .map(part => part.replace(/^:/, ''));

    // save this match
    routeMatches[route.path] = { test, routeParams };
  }

  // retrieve the stored route matcher
  const { test, routeParams } = routeMatches[route.path];

  // check if this is a match
  const match = url.match(test);
  if (!match) {
    return null;
  }

  // if there are route parameters, get them
  // from the capture group
  const urlParams = routeParams.reduce((acc, param, i) =>
    Object.assign(acc, {
      // capture group results start at match[1]
      [param]: match[i + 1],
    }),
  {});

  // return the component and its parameters
  return { component: route.component, params: urlParams };
};

// given a url, iterates over the routing table
// to find a match
const matchRoute = url =>
  configuredRoutes.reduce((matched, route) => {
    if (matched) {
      return matched;
    }
    return matchRoutePath(route, url);
  }, null);

// router interface
export default function getRouter(routes) {
  // store routes configured with the base path
  configuredRoutes = routes.map(route =>
    Object.assign(route, {
      path: `${BASE_PATH}${route.path}`,
    }));

  return (state, dispatch) => {
    // if the router state is not yet initialized
    // set the router path to window.location
    if (!state.router || !state.router.path) {
      dispatch(go(window.location.pathname.replace(BASE_PATH, '')));
      return null;
    }

    // get the component for the route
    const matched = matchRoute(state.router.path);
    if (matched) {
      return matched.component();
    }
    return null;
  };
}

// reducer is applied by middleware to the store
// responds to UPDATE_LOCATION events by updating
// router state
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

// store middleware, listens for back button and applies
// UPDATE_LOCATION events to browser history
export function routerMiddleware(next, state, action, dispatch) {
  const nextState = routeReducer(state, action);

  if (action.type === MIDDLEWARE_APPLIED && action.payload.indexOf('routerMiddleware') !== -1) {
    // listen for forward and back button
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      const originalState = event.state;
      if (originalState !== null) {
        // if we have the previous state, navigate to the previous url
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
