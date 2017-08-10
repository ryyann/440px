// home.js
// template for home page

/* eslint-disable no-param-reassign */
import { connect } from '../store';
import nav from '../components/nav';
import imageLink from '../components/imageLink';
import spinner from '../components/spinner';
import { getFeaturedImages } from '../actions';
import './home.css';

export function home(state, dispatch) {
  const {
    home: { isLoading },
    images: { items },
  } = state;
  let images = [];

  // if there is no image metadata stored, fetch
  // it from 500px
  if (items.length === 0 && !isLoading) {
    getFeaturedImages(dispatch);
  } else {
    // render a list of image links
    images = items.map(id =>
      imageLink({
        id,
        size: 2,
      }));
  }

  return {
    type: 'div',
    className: 'home',
    children: [
      nav(),
      !isLoading ? {
        type: 'div',
        className: 'home-images',
        children: [...images],
      } : spinner(), // if no images are yet loaded, display a spinner
    ],
  };
}

export default connect(home);
