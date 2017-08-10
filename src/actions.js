import * as api from './api';

export const GET_IMAGE_PENDING = 'GET_IMAGE_PENDING';
export const GET_IMAGE_FULFILLED = 'GET_IMAGE_FULFILLED';
export const GET_IMAGE_REJECTED = 'GET_IMAGE_REJECTED';
export const GET_FEATURED_IMAGES_PENDING = 'GET_FEATURED_IMAGES_PENDING';
export const GET_FEATURED_IMAGES_FULFILLED = 'GET_FEATURED_IMAGES_FULFILLED';
export const GET_FEATURED_IMAGES_REJECTED = 'GET_FEATURED_IMAGES_REJECTED';

const getImagePending = id => ({ type: GET_FEATURED_IMAGES_PENDING, payload: id });
const getImageFulfilled = payload => ({ type: GET_FEATURED_IMAGES_FULFILLED, payload });
const getImageRejected = error => ({ type: GET_FEATURED_IMAGES_REJECTED, error });

const getFeaturedImagesPending = () => ({ type: GET_FEATURED_IMAGES_PENDING });
const getFeaturedImagesFulfilled = payload => ({ type: GET_FEATURED_IMAGES_FULFILLED, payload });
const getFeaturedImagesRejected = error => ({ type: GET_FEATURED_IMAGES_REJECTED, error });

export const getImage = async (dispatch, id) => {
  let image;
  dispatch(getImagePending(id));
  try {
    const res = await api.getImage(id);
    const json = await res.json();
    image = json;
  } catch (e) {
    dispatch(getImageRejected(e));
  }
  dispatch(getImageFulfilled(image));
};

export const getFeaturedImages = async (dispatch) => {
  let images;
  dispatch(getFeaturedImagesPending());
  try {
    const res = await api.getFeaturedImages();
    const json = await res.json();
    images = json.photos;
  } catch (e) {
    return dispatch(getFeaturedImagesRejected(e));
  }
  return dispatch(getFeaturedImagesFulfilled(images));
};
