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

  if (items.length === 0 && !isLoading) {
    getFeaturedImages(dispatch);
  } else {
    images = items.map(id =>
      imageLink({
        id,
        size: 2,
      }));
  }

  if (isLoading) {
    return {
      type: 'div',
      className: 'home',
      children: [
        nav(),
        spinner(),
      ],
    };
  }

  return {
    type: 'div',
    className: 'home',
    children: [
      nav(),
      {
        type: 'div',
        className: 'home-images',
        children: [...images],
      },
    ],
  };
}

export default connect(home);
