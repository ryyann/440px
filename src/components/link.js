import { withDispatch } from '../store';
import { go } from '../lib/router';

const link = (dispatch, options) => ({
  type: 'a',
  attributes: [
    ['href', options.to],
  ],
  listeners: [
    ['click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(go(options.to));
    }],
  ],
  children: [options.text],
});

export default withDispatch(link);
