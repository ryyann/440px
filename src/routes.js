/* eslint-disable import/no-named-as-default */

// routes.js
// Define app routes here, route parameters
// are parsed and stored in app state at
// `state.router.params`. Define a parameter
// with a `:`, ex: `/image/:id`

import home from './pages/home';
import image from './pages/image';

export default [
  {
    path: '/',
    component: home,
  },
  {
    path: '/image/:id',
    component: image,
  },
];
