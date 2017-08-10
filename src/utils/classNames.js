export default function classNames(...names) {
  return names.filter(name => name && name.length).join(' ');
}
