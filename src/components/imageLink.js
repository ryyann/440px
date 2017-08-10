import image from './image';
import link from './link';
import './imageLink.css';

export default function imageLink({ id, size }) {
  return link({
    className: 'image-link',
    to: `/image/${id}`,
    children: [
      {
        type: 'span',
        className: 'hover-text',
        children: ['view image'],
      },
      image({ id, size }),
    ],
  });
}
