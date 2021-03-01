import { createIframe } from '../../utils'

import { PopoverOptions } from './popover-options'

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

const buildPopover = () => {
  const popover = document.createElement('div')
  popover.className = 'typeform-popover'
  popover.style.opacity = '0'
  return popover
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  spinner.style.display = 'none'
  return spinner
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-iframe-wrapper'
  wrapper.style.opacity = '0'
  return wrapper
}

const buildCloseButton = () => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.style.display = 'none'
  closeButton.innerHTML = '&times;'
  return closeButton
}

export const createPopover = (formId: string, userOptions: PopoverOptions): Popover => {
  const spinner = buildSpinner()
  const element = userOptions.element
  const parentNode = element?.parentNode
  const close = () => {
    if (isOpen(popover)) {
      popover.style.opacity = '0'
      wrapper.style.opacity = '0'
      setTimeout(() => {
        popover.parentNode.removeChild(popover)
        spinner.parentNode?.removeChild(spinner)
        closeButton.parentNode?.removeChild(closeButton)
      }, 250)
    }
  }

  const closeButton = buildCloseButton()
  const popover = buildPopover()

  const onReady = () => {
    setTimeout(() => {
      popover.style.opacity = '1'
      spinner.style.display = 'none'
      closeButton.style.display = 'block'
    })
  }

  const options = { onReady, ...userOptions }
  const iframe = createIframe(formId, 'popover', options)

  const wrapper = buildWrapper()
  const container = options.container || document.body

  wrapper.append(iframe)
  popover.append(wrapper)

  iframe.onload = () => {
    wrapper.style.opacity = '1'
  }

  const open = () => {
    if (!isOpen(popover)) {
      container.append(popover)
      spinner.style.display = 'block'
      if (parentNode && element) {
        parentNode.append(spinner)
        parentNode.append(closeButton)
        parentNode.removeChild(element)
      }
    }
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
