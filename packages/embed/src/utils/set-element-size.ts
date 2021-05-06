interface ElementSize {
  width?: number
  height?: number
}

export const setElementSize = (element: HTMLElement, { width, height }: ElementSize) => {
  if (width) {
    element.style.width = `${width}px`
  }

  if (height) {
    element.style.height = `${height}px`
  }

  return element
}
