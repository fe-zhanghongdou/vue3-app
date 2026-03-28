export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timer: number | null = null
  return function (this: any, ...args: Parameters<T>) {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      fn.apply(context, args)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
