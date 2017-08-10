const config = {
  development: {
    BASE_PATH: '',
    API_HOST: 'https://api.500px.com/v1',
    API_CONSUMER_KEY: 'YajGY9WC3z6ANzPiycFCdxDsM38sGJJiBYsFfx6S',
  },
  production: {
    BASE_PATH: '',
    API_HOST: 'https://api.500px.com/v1',
    API_CONSUMER_KEY: 'YajGY9WC3z6ANzPiycFCdxDsM38sGJJiBYsFfx6S',
  },
};

export default (() => config[process.env.NODE_ENV])();
