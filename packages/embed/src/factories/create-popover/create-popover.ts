import { createIframe } from '../../utils'
import { EmbedType } from '../../base'

import { PopoverOptions } from './popover-options'
import { buildPopover } from './elements'

export type Popover = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
}

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (popover: HTMLElement): popover is HTMLElementWithParentNode => !!popover.parentNode

const handlePopupOpen = (event: any) => {
  alert(JSON.stringify(event.data))
}

export const createPopover = (formId: string, options: PopoverOptions = {}): Popover => {
  const iframe = createIframe(formId, EmbedType.Popover, options)
  const popover = buildPopover(iframe)
  const container = options.container || document.body

  const open = () => {
    !isOpen(popover) && container.append(popover)
    window.addEventListener('message', handlePopupOpen)
  }

  const close = () => {
    isOpen(popover) && popover.parentNode.removeChild(popover)
    window.removeEventListener('message', handlePopupOpen)
  }

  const toggle = () => {
    isOpen(popover) ? close() : open()
  }

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
