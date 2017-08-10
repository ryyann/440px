import classNames from '../utils/classNames';
import './spinner.css';

export default function spinner({ className } = {}) {
  return {
    type: 'div',
    className: 'loading-spinner-container',
    children: [{
      type: 'div',
      className: classNames('loading-spinner', className),
    }],
  };
}
