import config from './config';

const { API_HOST, API_CONSUMER_KEY } = config;

const apiRequest = (path, options) => fetch(`${API_HOST}${path}&consumer_key=${API_CONSUMER_KEY}`, options);

export const getImage = id => apiRequest(`/photos/${id}?image_size=440&comments=1`);
export const getRandomImage = () => 'random image';
