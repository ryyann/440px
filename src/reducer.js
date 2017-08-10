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

const toIds = imageItems => imageItems.reduce((ids, item) =>
  Object.assign(ids, { [item.id]: item }), {});

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
        images: {
          byId: toIds(action.payload),
          items: action.payload.map(item => item.id.toString()),
        },
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
