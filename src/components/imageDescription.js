// imageDescription.js
// renders an image description from stored metadata.
// returns null when an image is not found.

import { withState } from '../store';
import './imageDescription.css';

function imageDescription(state, id) {
  // read metadata from store
  const image = state.images.byId[id];

  return image ? {
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
  } : null;
}

export default withState(imageDescription);
