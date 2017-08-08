/* eslint-disable no-param-reassign */
import image from '../components/image';
import link from '../components/link';
import { getImage } from '../api';

export default function home(state, dispatch) {
  async function load() {
    const res = await getImage('93415163');
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
          link({ to: '/image', text: 'photo' }),
        ],
      },
      state.image ? image({ src: state.image, className: 'wow' }) : null,
    ],
  };
}
