import { withState } from '../store';
import './imageDescription.css';

function imageDescription(state, id) {
  const image = state.images.byId[id];
  return {
    type: 'div',
    className: 'image-description',
    children: [
      {
        type: 'h2',
        className: 'title',
        children: [image.name],
      },
      {
        type: 'h4',
        className: 'author',
        children: [
          {
            type: 'span',
            children: ['by '],
          },
          image.user.fullname,
        ],
      },
      image.description ? {
        type: 'p',
        children: [image.description],
      } : null,
    ],
  };
}

export default withState(imageDescription);
