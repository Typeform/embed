import { camelCaseToKebabCase } from './load-options-from-attributes'

export const addAttributesToElement = (element: HTMLElement, props = {}) => {
  Object.keys(props).forEach((key) => {
    if (props[key] === undefined || props[key] === null) {
      return
    }
    element.setAttribute(camelCaseToKebabCase(key), props[key])
  })
}
