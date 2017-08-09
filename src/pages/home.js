/* eslint-disable no-param-reassign */
import { connect } from '../store';
import image from '../components/image';
import link from '../components/link';
import { getFeaturedImages } from '../api';

export function home(state, dispatch) {
  async function load() {
    const res = await getFeaturedImages();
    const json = await res.json();
    dispatch({ type: 'LOAD', payload: json.photo.image_url });
  }

  return {
    type: 'div',
    children: [
      state.greeting === 'hello world' ? 'wow' : null,
      {
        type: 'button',
        listeners: [
          ['click', load],
        ],
        children: [
          `${state.greeting}`,
        ],
      },
      {
        type: 'div',
        children: [
          link({ to: '/image/400', text: 'photo' }),
        ],
      },
      state.image ? image({ src: state.image, className: 'wow' }) : null,
    ],
  };
}

export default connect(home);
