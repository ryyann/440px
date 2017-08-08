require('dotenv').config();

module.exports = {
  use: [
    'neutrino-preset-jest',
    'neutrino-preset-airbnb-base',
    ['neutrino-preset-web', {
      babel: {
        presets: ['stage-3']
      },
      html: {
        title: '440px',
        links: [
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "http://localhost:5000/static/apple-touch-icon.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "http://localhost:5000/static/favicon-32x32.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "http://localhost:5000/static/favicon-16x16.png"
          }
        ]
      }
    }]
  ]
};
