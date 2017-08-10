// components/image.js
// Image component, takes an iamge id and renders
// the corresponding image

import { connect } from '../store';
import { getImage } from '../actions';
import spinner from './spinner';
import classNames from '../utils/classNames';
import './image.css';

const sizes = {
  1: {
    width: '70px',
    height: '70px',
  },
  2: {
    width: '140px',
    height: '140px',
  },
  3: {
    width: '280px',
    height: '280px',
  },
  440: {
    width: '440px',
    height: '440px',
  },
};

// get image url for requested size
const getSize = (imgSize, imgObj) =>
  imgObj.images.filter(({ size }) => imgSize === size)[0].url;

function image(state, dispatch, {
  id,
  alt = '',
  className,
  size = 2,
}) {
  // read image metadata from store
  const imgObject = state.images.byId[id];

  // if image is not stored, fetch metadata
  if (!imgObject) {
    getImage(dispatch, id);
  }
  return {
    type: 'div',
    className: classNames('image', className),
    children: [
      imgObject ? {
        type: 'img',
        attributes: [
          ['src', getSize(size, imgObject)],
          ['alt', alt],
          ['style', `width: ${sizes[size].width}; height: ${sizes[size].height};`],
        ],
      } : spinner({ className: 'image-spinner' }),
    ],
  };
}

export default connect(image);
