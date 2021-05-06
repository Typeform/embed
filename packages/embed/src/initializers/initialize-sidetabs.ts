import { createSidetab } from '../factories/create-sidetab'
import { includeCss } from '../utils'
import { SIDETAB_ATTRIBUTE } from '../constants'

import { buildOptionsFromAttributes } from './build-options-from-attributes'

export const initializeSidetabs = () => {
  const sidetabElements = document.querySelectorAll<HTMLElement>(`[${SIDETAB_ATTRIBUTE}]`)

  if (sidetabElements.length) {
    includeCss('sidetab.css')
  }

  Array.from(sidetabElements).forEach((button, index) => {
    const formId = button.getAttribute(SIDETAB_ATTRIBUTE)

    if (!formId) {
      throw new Error(`Invalid ${SIDETAB_ATTRIBUTE}=${formId} for sidetab embed #${index}`)
    }

    createSidetab(formId, buildOptionsFromAttributes(button))
  })
}
