import { includeCss } from '../utils'

import { buildOptionsFromAttributes } from './build-options-from-attributes'

export const initialize = (
  embedElementAttribute: string,
  cssFilename: string,
  forceReload: boolean = false,
  factoryMethod: (id: string, options: any, element: HTMLElement) => void
) => {
  const embedTypeElements = document.querySelectorAll<HTMLElement>(`[${embedElementAttribute}]`)

  if (embedTypeElements.length > 0) {
    includeCss(cssFilename)
  }

  Array.from(embedTypeElements).forEach((element, index) => {
    if (forceReload || element.dataset.tfLoaded !== 'true') {
      const formId = element.getAttribute(embedElementAttribute)
      if (!formId) {
        throw new Error(`Invalid ${embedElementAttribute}=${formId} for embed #${index}`)
      }
      factoryMethod(formId, buildOptionsFromAttributes(element), element)
      element.dataset.tfLoaded = 'true'
    }
  })
}
