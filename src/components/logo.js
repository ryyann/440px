import link from './link';
import classNames from '../utils/classNames';
import './logo.css';

export default function logo({ className } = {}) {
  return link({
    to: '/',
    className: 'logo',
    children: [
      {
        type: 'h1',
        className: classNames('logo', className),
        children: [
          '440px',
        ],
      },
    ],
  });
}
