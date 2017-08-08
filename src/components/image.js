import classNames from '../utils/classNames';

export default function image({ src, alt, className }) {
  return {
    type: 'div',
    className: classNames('image', className),
    children: [{
      type: 'img',
      attributes: [
        ['src', src],
        ['alt', alt],
      ],
    }],
  };
}
