import { createPopup, PopupOptions } from '../factories/create-popup'
import { POPUP_ATTRIBUTE } from '../constants'
import { invokeWithoutDefault } from '../utils'

import { initialize } from './initialize'

export const initializePopups = ({
  container,
  forceReload = false,
}: {
  container?: HTMLElement
  forceReload?: boolean
}) => {
  initialize({
    embedElementAttribute: POPUP_ATTRIBUTE,
    cssFilename: 'popup.css',
    container,
    forceReload,
    factoryMethod: (formId, options, button) => {
      const { toggle } = createPopup(formId, options as PopupOptions)
      button.onclick = invokeWithoutDefault(toggle)
    },
  })
}
