import link from '../components/link';

export default function image() {
  return {
    type: 'div',
    children: [
      link({ to: '/', text: 'go home' }),
      'image page',
    ],
  };
}
