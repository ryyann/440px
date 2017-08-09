/* eslint-disable import/no-named-as-default */
import home from './pages/home';
import image from './pages/image';

export default [
  {
    path: '/',
    component: home,
  },
  {
    path: '/image/:id',
    component: image,
  },
];
