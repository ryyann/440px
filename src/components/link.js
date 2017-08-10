// link.js
// router connected link

import { withDispatch } from '../store';
import { go } from '../lib/router';
import classNames from '../utils/classNames';

const link = (dispatch, options) => ({
  type: 'a',
  className: classNames('link', options.className),
  attributes: [
    ['href', options.to],
  ],
  listeners: [
    ['click', (e) => {
      // prevent browser navigation
      e.preventDefault();
      e.stopPropagation();

      // dispatch UPDATE_LOCATION event
      dispatch(go(options.to));
    }],
  ],
  children: options.children || [options.text],
});

export default withDispatch(link);
