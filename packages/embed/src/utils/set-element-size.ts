interface ElementSize {
  width?: number | string
  height?: number | string
}

export const getValueWithUnits = (value: number | string): string => {
  if (typeof value === 'string' && !value.match(/^[0-9]+$/)) {
    return value
  } else {
    return `${value}px`
  }
}

export const setElementSize = (element: HTMLElement, { width, height }: ElementSize) => {
  if (width) {
    element.style.width = getValueWithUnits(width)
  }

  if (height) {
    element.style.height = getValueWithUnits(height)
  }

  return element
}
