import { includeCss, waitForHubspotCookie } from '../utils'

import { buildOptionsFromAttributes } from './build-options-from-attributes'

export const initialize = async (
  embedElementAttribute: string,
  cssFilename: string,
  forceReload: boolean = false,
  factoryMethod: (id: string, options: unknown, element: HTMLElement) => void
) => {
  const embedTypeElements = document.querySelectorAll<HTMLElement>(`[${embedElementAttribute}]`)

  if (embedTypeElements.length > 0) {
    includeCss(cssFilename)
  }

  for (let index = 0; index < embedTypeElements.length; index += 1) {
    const element = embedTypeElements.item(index)
    if (forceReload || element.dataset.tfLoaded !== 'true') {
      const formId = element.getAttribute(embedElementAttribute)
      if (!formId) {
        throw new Error(`Invalid ${embedElementAttribute}=${formId} for embed #${index}`)
      }
      if (element.hasAttribute('data-tf-hubspot')) {
        await waitForHubspotCookie()
      }
      factoryMethod(formId, buildOptionsFromAttributes(element), element)
      element.dataset.tfLoaded = 'true'
    }
  }
}
