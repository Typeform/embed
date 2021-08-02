import { createPopover } from '../factories/create-popover'
import { POPOVER_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializePopovers = (forceReload: boolean = false) => {
  initialize(POPOVER_ATTRIBUTE, 'popover.css', forceReload, (formId, options, button) => {
    const { toggle } = createPopover(formId, options)
    button.onclick = toggle
  })
}
