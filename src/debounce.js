export function debounce(fn, wait, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
