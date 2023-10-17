import { includeCss, waitForHubspotCookie } from '../utils'

import { buildOptionsFromAttributes } from './build-options-from-attributes'
import { mergeOptions } from './merge-options'

export const initialize = async ({
  embedElementAttribute,
  cssFilename,
  forceReload = false,
  factoryMethod,
  container = document,
}: {
  embedElementAttribute: string
  cssFilename: string
  forceReload?: boolean
  factoryMethod: (id: string, options: unknown, element: HTMLElement) => void
  container?: HTMLElement | Document
}) => {
  const embedTypeElements = container.querySelectorAll<HTMLElement>(`[${embedElementAttribute}]`)

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

      const options = mergeOptions(
        buildOptionsFromAttributes(element),
        container === document ? {} : buildOptionsFromAttributes(container as HTMLElement)
      )

      factoryMethod(formId, options, element)
      element.dataset.tfLoaded = 'true'
    }
  }
}
