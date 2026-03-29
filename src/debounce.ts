export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timer: number | null = null;
  return function (this: unknown, ...args: Parameters<T>) {
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
