import { createIframe } from '../../utils'

import { PopupOptions } from './popup-options'
import { buildCloseButton, buildPopup } from './elements'

export type Popup = {
  open: () => void
  close: () => void
  refresh: () => void
}

export const createPopup = (formId: string, options: PopupOptions): Popup => {
  const iframe = createIframe(formId, 'popup', options)
  const popup = buildPopup(iframe)
  const container = options.container || document.body

  const open = () => {
    container.append(popup)
  }

  const close = () => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup)
    }
  }

  popup.append(buildCloseButton(close))

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  return {
    open,
    close,
    refresh,
  }
}
