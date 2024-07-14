import {
  createIframe,
  hasDom,
  isDefined,
  setElementSize,
  handleCustomOpen,
  unmountElement,
  setAutoClose,
  addCustomKeyboardListener,
  invokeWithoutDefault,
  handlePreventReopenOnClose,
} from '../../utils'
import type { RemoveHandler } from '../../utils'
import { POPUP_SIZE } from '../../constants'
import { isInPage, isOpen } from '../../utils'
import { EmbedPopup } from '../../base'

import { PopupOptions } from './popup-options'

export type Popup = EmbedPopup

const buildPopup = () => {
  const popup = document.createElement('div')
  popup.className = 'tf-v1-popup'
  popup.dataset.testid = 'tf-v1-popup'
  popup.style.opacity = '0'
  return popup
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'tf-v1-spinner'
  return spinner
}

const buildWrapper = (width?: number | string, height?: number | string, size?: number) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'tf-v1-iframe-wrapper'
  wrapper.style.opacity = '0'

  if (isDefined(width) && isDefined(height)) {
    return setElementSize(wrapper, { width, height })
  }

  wrapper.style.width = `calc(${size}% - 80px)`
  wrapper.style.height = `calc(${size}% - 80px)`

  return wrapper
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('button')
  closeButton.className = 'tf-v1-close tf-v1-close-icon'
  closeButton.innerHTML = '&times;'
  closeButton.ariaLabel = 'Close'
  closeButton.onclick = invokeWithoutDefault(close)
  return closeButton
}

export const createPopup = (formId: string, userOptions: PopupOptions = {}): Popup => {
  if (!hasDom()) {
    return {
      open: () => {},
      close: () => {},
      toggle: () => {},
      refresh: () => {},
      focus: () => {},
      unmount: () => {},
    }
  }

  const { width, height, size = POPUP_SIZE, onClose, domain, ...options } = userOptions

  const { iframe, embedId, refresh, focus } = createIframe('popup', { formId, domain, options })
  const scrollInitialState = document.body.style.overflow
  let openHandler: RemoveHandler

  const popup = buildPopup()
  const spinner = buildSpinner()
  const wrapper = buildWrapper(width, height, size)

  wrapper.append(iframe)
  popup.append(spinner)
  popup.append(wrapper)

  const container = options.container || document.body

  iframe.onload = (event) => {
    if (event?.isTrusted) {
      wrapper.style.opacity = '1'
      setTimeout(() => {
        spinner.style.display = 'none'
      }, 250)
      addCustomKeyboardListener(close)
    }
  }

  const open = () => {
    if (!isOpen(popup)) {
      if (!isInPage(popup)) {
        spinner.style.display = 'block'
        container.append(popup)
      } else {
        popup.style.display = 'flex'
      }
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        popup.style.opacity = '1'
      })
    }
  }

  const close = () => {
    if (isOpen(popup)) {
      handlePreventReopenOnClose(options, formId)
      onClose?.()
      popup.style.opacity = '0'
      document.body.style.overflow = scrollInitialState
      setTimeout(() => {
        if (options.keepSession) {
          popup.style.display = 'none'
        } else {
          unmount()
        }
      }, 250)
    }
  }

  wrapper.append(buildCloseButton(close))

  setAutoClose(embedId, options.autoClose, close)

  const toggle = () => {
    isOpen(popup) ? close() : open()
  }

  if (options.open && !isOpen(popup)) {
    openHandler = handleCustomOpen(open, options, formId)
  }

  const unmount = () => {
    unmountElement(popup)
    if (options.open && openHandler?.remove) {
      openHandler.remove()
    }
  }

  return {
    open,
    close,
    toggle,
    refresh,
    focus,
    unmount,
  }
}
