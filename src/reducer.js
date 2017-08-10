// reducer.js
// transform app state in response to actions

import {
  GET_FEATURED_IMAGES_PENDING,
  GET_FEATURED_IMAGES_FULFILLED,
  GET_FEATURED_IMAGES_REJECTED,
} from './actions';

export const initialState = {
  images: {
    byId: {},
    items: [],
  },
  home: {
    isLoading: false,
  },
  image: {
    isLoading: false,
  },
};

// map items to their ID
const toIds = imageItems => imageItems.reduce((ids, item) =>
  Object.assign(ids, { [item.id]: item }), {});

// normalize image response
const normalize = imageItems => ({
  byId: toIds(imageItems),
  items: imageItems.map(item => item.id.toString()),
});

export default function reducer(state, action) {
  switch (action.type) {
    case GET_FEATURED_IMAGES_PENDING:
      return Object.assign({}, state, {
        images: {
          items: [],
        },
        home: {
          isLoading: true,
        },
      });
    case GET_FEATURED_IMAGES_FULFILLED:
      return Object.assign({}, state, {
        images: normalize(action.payload),
        home: {
          isLoading: false,
        },
      });
    case GET_FEATURED_IMAGES_REJECTED:
      return Object.assign({}, state, {
        home: {
          isLoading: false,
        },
      });
    default:
      return state;
  }
}
