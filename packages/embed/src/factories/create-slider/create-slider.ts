import {
  createIframe,
  hasDom,
  setElementSize,
  handleCustomOpen,
  unmountElement,
  setAutoClose,
  addCustomKeyboardListener,
  isOpen,
  isInPage,
  invokeWithoutDefault,
  handlePreventReopenOnClose,
} from '../../utils'
import type { RemoveHandler } from '../../utils'
import { SLIDER_POSITION, SLIDER_WIDTH } from '../../constants'
import { EmbedPopup } from '../../base'

import { SliderOptions } from './slider-options'

export type Slider = EmbedPopup

type Position = 'right' | 'left'

const buildSlider = (position: Position) => {
  const slider = document.createElement('div')
  slider.className = `tf-v1-slider ${position}`
  slider.dataset.testid = 'tf-v1-slider'
  slider.style.opacity = '0'
  return slider
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'tf-v1-spinner'
  return spinner
}

const buildWrapper = (position: Position, width: number | string) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'tf-v1-iframe-wrapper'
  wrapper.style[position] = '-100%'
  return setElementSize(wrapper, { width })
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('button')
  closeButton.className = 'tf-v1-close tf-v1-close-icon'
  closeButton.innerHTML = '&times;'
  closeButton.ariaLabel = 'Close'
  closeButton.onclick = invokeWithoutDefault(close)
  return closeButton
}

export const createSlider = (formId: string, userOptions: SliderOptions = {}): Slider => {
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

  const { position = SLIDER_POSITION, width = SLIDER_WIDTH, onClose, domain, ...options } = userOptions
  const { iframe, embedId, refresh, focus } = createIframe('slider', { formId, domain, options })
  const scrollInitialState = document.body.style.overflow
  let openHandler: RemoveHandler

  const slider = buildSlider(position)
  const spinner = buildSpinner()
  const wrapper = buildWrapper(position, width)

  wrapper.append(iframe)
  slider.append(spinner)
  slider.append(wrapper)

  const container = options.container || document.body

  iframe.onload = (event) => {
    if (event?.isTrusted) {
      wrapper.style[position] = '0'
      setTimeout(() => {
        spinner.style.display = 'none'
      }, 500)
      addCustomKeyboardListener(close)
    }
  }

  const open = () => {
    if (!isOpen(slider)) {
      if (!isInPage(slider)) {
        container.append(slider)
        spinner.style.display = 'block'
      } else {
        slider.style.display = 'flex'
        setTimeout(() => {
          wrapper.style[position] = '0'
        })
      }
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        slider.style.opacity = '1'
      })
    }
  }

  const close = () => {
    if (isOpen(slider)) {
      handlePreventReopenOnClose(options, formId)
      onClose?.()
      slider.style.opacity = '0'
      wrapper.style[position] = '-100%'
      document.body.style.overflow = scrollInitialState
      setTimeout(() => {
        if (options.keepSession) {
          slider.style.display = 'none'
        } else {
          unmount()
        }
      }, 500)
    }
  }

  setAutoClose(embedId, options.autoClose, close)

  const toggle = () => {
    isOpen(slider) ? close() : open()
  }

  wrapper.append(buildCloseButton(close))

  if (options.open && !isOpen(slider)) {
    openHandler = handleCustomOpen(open, options, formId)
  }

  const unmount = () => {
    unmountElement(slider)
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
