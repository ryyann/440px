import { withState } from '../store';
import imageLink from './imageLink';
import './nextImages.css';

function nextImages(state, id) {
  const { items } = state.images;
  const index = items.indexOf(id);
  let nextItems;
  if (index === 0) {
    nextItems = items.slice(index, index + 5);
  } else if (index === items.length - 1) {
    nextItems = items.slice(index - 5, index);
  } else {
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
