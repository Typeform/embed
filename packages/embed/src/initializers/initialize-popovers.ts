import { createPopover } from '../factories/create-popover'
import { includeCss } from '../utils'
import { POPOVER_ATTRIBUTE } from '../constants'

export const initializePopovers = () => {
  const popoverElements = document.querySelectorAll<HTMLElement>(`[${POPOVER_ATTRIBUTE}]`)

  if (popoverElements.length > 0) {
    includeCss('./lib/css/popover.css')
  }

  Array.from(popoverElements).forEach((button, index) => {
    const formId = button.getAttribute(POPOVER_ATTRIBUTE)
    if (!formId) {
      throw new Error(`Invalid ${POPOVER_ATTRIBUTE}=${formId} for popover embed #${index}`)
    }
    const { toggle } = createPopover(formId)
    button.onclick = toggle
  })
}
