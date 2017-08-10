import config from './config';

const { API_HOST, API_CONSUMER_KEY } = config;

const apiRequest = (path, options) => fetch(`${API_HOST}${path}&consumer_key=${API_CONSUMER_KEY}`, options);

export const getFeaturedImages = (page = 0, qty = 50, sizes = [2, 440]) => apiRequest(`/photos/?feature=editors&rpp=${qty}&page=${page}&image_size=${sizes.join()}`);
export const getImage = id => apiRequest(`/photos/${id}?image_size=440&comments=1`);
export const getRandomImage = () => 'random image';
