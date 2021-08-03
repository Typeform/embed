import { createPopup } from '../factories/create-popup'
import { POPUP_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializePopups = (forceReload: boolean = false) => {
  initialize(POPUP_ATTRIBUTE, 'popup.css', forceReload, (formId, options, button) => {
    const { toggle } = createPopup(formId, options)
    button.onclick = toggle
  })
}
