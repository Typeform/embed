import { createIframe } from '../../utils'

import { PopupOptions } from './popup-options'

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

const defaultPopupOptions: PopupOptions = {
  width: 200,
  height: 200,
}

const buildPopup = () => {
  const popup = document.createElement('div')
  popup.className = 'typeform-popup'
  popup.style.opacity = '0'
  return popup
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  return spinner
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-iframe-wrapper'
  wrapper.style.opacity = '0'
  return wrapper
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = close
  return closeButton
}

export const createPopup = (formId: string, options: PopupOptions = defaultPopupOptions): Popup => {
  const iframe = createIframe(formId, 'popup', options)

  const popup = buildPopup()
  const spinner = buildSpinner()
  const wrapper = buildWrapper()

  wrapper.append(iframe)
  popup.append(spinner)
  popup.append(wrapper)

  const container = options.container || document.body

  iframe.onload = () => {
    wrapper.style.opacity = '1'
    setTimeout(() => {
      spinner.style.display = 'none'
    }, 250)
  }

  const open = () => {
    if (!isOpen(popup)) {
      container.append(popup)
      setTimeout(() => {
        popup.style.opacity = '1'
      })
    }
  }

  const close = () => {
    if (isOpen(popup)) {
      popup.style.opacity = '0'
      wrapper.style.opacity = '0'
      setTimeout(() => {
        popup.parentNode.removeChild(popup)
        spinner.style.display = 'block'
      }, 250)
    }
  }

  const toggle = () => {
    isOpen(popup) ? close() : open()
  }

  wrapper.append(buildCloseButton(close))

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
