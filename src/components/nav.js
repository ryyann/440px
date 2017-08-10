// nav.js
// site-wide top navbar. when not on
// home page, provides a link to go home

import { withState } from '../store';
import logo from './logo';
import link from './link';
import './nav.css';

function nav(state) {
  return {
    type: 'nav',
    className: 'top-nav',
    children: [
      logo({ className: 'nav-logo' }),
      state.router.path === '/' ? {
        type: 'div',
        className: 'tagline',
        children: [
          'for when ',
          {
            type: 'a',
            attributes: [
              ['href', 'https://500px.com'],
            ],
            children: ['500px'],
          },
          ' is just too dang big',
        ],
      } : {
        type: 'div',
        children: [
          link({
            to: '/',
            className: 'back',
            children: [
              { type: 'span', children: ['👈'] },
              'go home',
            ],
          }),
        ],
      },
    ],
  };
}

export default withState(nav);
