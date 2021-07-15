import {
  createIframe,
  hasDom,
  isDefined,
  setElementSize,
  handleCustomOpen,
  unmountElement,
  setAutoClose,
  addCustomKeyboardListener,
} from '../../utils'
import { POPUP_SIZE } from '../../constants'

import { PopupOptions } from './popup-options'

export type Popup = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
  unmount: () => void
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
    return setElementSize(wrapper, { width, height })
  }

  wrapper.style.width = `calc(${size}% - 80px)`
  wrapper.style.height = `calc(${size}% - 80px)`

  return wrapper
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = close
  return closeButton
}

export const createPopup = (formId: string, userOptions: PopupOptions = {}): Popup => {
  if (!hasDom()) {
    return {
      open: () => {},
      close: () => {},
      toggle: () => {},
      refresh: () => {},
      unmount: () => {},
    }
  }

  const { width, height, size = POPUP_SIZE, ...options } = userOptions

  const { iframe, embedId } = createIframe(formId, 'popup', options)
  const scrollInitialState = document.body.style.overflow

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
    addCustomKeyboardListener(close)
  }

  const open = () => {
    if (!isOpen(popup)) {
      container.append(popup)
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        popup.style.opacity = '1'
      })
    }
  }

  const close = () => {
    if (isOpen(popup)) {
      popup.style.opacity = '0'
      wrapper.style.opacity = '0'
      document.body.style.overflow = scrollInitialState
      setTimeout(() => {
        unmount()
        spinner.style.display = 'block'
      }, 250)
    }
  }

  wrapper.append(buildCloseButton(close))

  setAutoClose(embedId, options.autoClose, close)

  const toggle = () => {
    isOpen(popup) ? close() : open()
  }

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  const unmount = () => {
    unmountElement(popup)
  }

  if (options.open && !isOpen(popup)) {
    handleCustomOpen(open, options.open, options.openValue)
  }

  return {
    open,
    close,
    toggle,
    refresh,
    unmount,
  }
}
