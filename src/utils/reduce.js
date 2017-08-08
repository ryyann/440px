export default function reduce(f, acc, obj) {
  if (arguments.length === 1) {
    return arg => reduce(f, arg);
  }
  if (arguments.length === 2) {
    return arg => reduce(f, acc, arg);
  }
  if (Array.isArray(obj)) {
    return obj.reduce(acc, obj, f);
  }
  Object.keys(obj).forEach(key => f(acc, Object[key], key, obj));
  return acc;
}
