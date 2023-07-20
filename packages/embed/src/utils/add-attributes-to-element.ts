import { camelCaseToKebabCase } from './load-options-from-attributes'

export const addAttributesToElement = (element: HTMLElement, props = {}) => {
  Object.keys(props).forEach((key) => {
    element.setAttribute(camelCaseToKebabCase(key), props[key])
  })
}
