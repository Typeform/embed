export const unmountElement = (element: HTMLElement) => {
  element.parentNode?.removeChild(element)
}
