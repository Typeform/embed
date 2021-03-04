import { createPopover } from '../factories/create-popover'
import { includeCss } from '../utils'
import { POPOVER_ATTRIBUTE } from '../constants'

import { buildOptionsFromAttributes } from './build-options-from-attributes'

export const initializePopovers = () => {
  const popoverElements = document.querySelectorAll<HTMLElement>(`[${POPOVER_ATTRIBUTE}]`)

  if (popoverElements.length > 0) {
    includeCss('popover.css')
  }

  Array.from(popoverElements).forEach((button, index) => {
    const formId = button.getAttribute(POPOVER_ATTRIBUTE)
    if (!formId) {
      throw new Error(`Invalid ${POPOVER_ATTRIBUTE}=${formId} for popover embed #${index}`)
    }
    const { toggle } = createPopover(
      formId,
      buildOptionsFromAttributes(button, {
        buttonColor: 'string',
        customIcon: 'string',
      })
    )
    button.onclick = toggle
  })
}
