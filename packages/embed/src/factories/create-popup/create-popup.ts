import { createIframe } from '../../utils'

import { PopupOptions } from './popup-options'
import { buildCloseButton, buildPopup } from './elements'

export type Popup = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
}

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (popup: HTMLElement): popup is HTMLElementWithParentNode => !!popup.parentNode

export const createPopup = (formId: string, options: PopupOptions = {}): Popup => {
  const iframe = createIframe(formId, 'popup', options)
  const popup = buildPopup(iframe)
  const container = options.container || document.body

  const open = () => {
    !isOpen(popup) && container.append(popup)
  }

  const close = () => {
    isOpen(popup) && popup.parentNode.removeChild(popup)
  }

  const toggle = () => {
    isOpen(popup) ? close() : open()
  }

  popup.append(buildCloseButton(close))

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  return {
    open,
    close,
    toggle,
    refresh,
  }
}
