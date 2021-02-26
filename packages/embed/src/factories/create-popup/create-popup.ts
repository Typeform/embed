import { createIframe, hasDom, isDefined } from '../../utils'
import { POPUP_SIZE } from '../../constants'

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

const buildWrapper = (width?: number, height?: number, size?: number) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-iframe-wrapper'
  wrapper.style.opacity = '0'

  if (isDefined(width) && isDefined(height)) {
    wrapper.style.width = `${width}px`
    wrapper.style.height = `${height}px`
  } else {
    wrapper.style.width = `calc(${size}% - 80px)`
    wrapper.style.height = `calc(${size}% - 80px)`
  }
  return wrapper
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = close
  return closeButton
}

export const createPopup = (formId: string, userOptions: PopupOptions): Popup => {
  if (!hasDom()) {
    return {
      open: () => {},
      close: () => {},
      toggle: () => {},
      refresh: () => {},
    }
  }

  const { width, height, size = POPUP_SIZE, ...options } = userOptions
  const iframe = createIframe(formId, 'popup', options)

  const popup = buildPopup()
  const spinner = buildSpinner()
  const wrapper = buildWrapper(width, height, size)

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
