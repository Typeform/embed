import { createIframe } from '../../utils'

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

export const createPopover = (formId: string, options: PopoverOptions = {}): Popover => {
  const iframe = createIframe(formId, 'popover', options)
  const popover = buildPopover(iframe)
  const container = options.container || document.body

  const open = () => {
    !isOpen(popover) && container.append(popover)
  }

  const close = () => {
    isOpen(popover) && popover.parentNode.removeChild(popover)
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
