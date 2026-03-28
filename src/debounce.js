export function debounce(fn, wait, immediate = false) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      fn.apply(context, args)
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
