// nextImages.js
// for a provided image id, renders
// a navigation bar with the previous
// image, the current image, and the
// next 3 images.

import { withState } from '../store';
import imageLink from './imageLink';
import './nextImages.css';

function nextImages(state, id) {
  // read item order from state
  const { items } = state.images;
  const index = items.indexOf(id);

  let nextItems;
  if (index === 0) {
    // if this is the first image, render it plus the next 4
    nextItems = items.slice(index, index + 5);
  } else if (index === items.length - 1) {
    // if this is the last image, render it and the previous 4
    nextItems = items.slice(index - 5, index);
  } else {
    // render the previous image, this image, and the next 3
    nextItems = items.slice(index - 1, index + 4);
  }
  return {
    type: 'div',
    className: 'next-images',
    children: nextItems.map(imageId => imageLink({
      id: imageId,
      className: imageId === id ? 'current' : '',
      size: 2,
    })),
  };
}

export default withState(nextImages);
