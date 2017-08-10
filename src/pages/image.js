// image.js
// template for image page

import { withState } from '../store';
import nav from '../components/nav';
import image from '../components/image';
import imageDescription from '../components/imageDescription';
import nextImages from '../components/nextImages';
import './image.css';

function imagePage(state) {
  // get the image to be rendered from router
  const { id } = state.router.params;
  return {
    type: 'div',
    className: 'large-image',
    children: [
      nav(),
      {
        type: 'div',
        className: 'image-details',
        children: [
          image({ size: 440, id, className: 'main-image' }),
          imageDescription(id),
        ],
      },
      nextImages(id),
    ],
  };
}

export default withState(imagePage);
