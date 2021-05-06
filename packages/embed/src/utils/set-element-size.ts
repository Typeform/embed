export const setElementSize = (element: HTMLElement, { width, height }: { width?: number; height?: number }) => {
  if (width) {
    element.style.width = `${width}px`
  }

  if (height) {
    element.style.height = `${height}px`
  }

  return element
}
