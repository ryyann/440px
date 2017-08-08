import { withState } from '../lib/store';
import { go } from '../lib/router';

const link = (state, dispatch, options) => ({
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

export default withState(link);
