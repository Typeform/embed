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
} from '../../utils'
import { SLIDER_POSITION, SLIDER_WIDTH } from '../../constants'

import { SliderOptions } from './slider-options'

export type Slider = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
  unmount: () => void
}

const buildSlider = (position: 'right' | 'left') => {
  const popup = document.createElement('div')
  popup.className = `tf-v1-slider ${position}`
  popup.style.opacity = '0'
  return popup
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'tf-v1-spinner'
  return spinner
}

const buildWrapper = (position: 'right' | 'left', width: number) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'tf-v1-iframe-wrapper'
  wrapper.style[position] = '-100%'
  return setElementSize(wrapper, { width })
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('a')
  closeButton.className = 'tf-v1-close'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = close
  return closeButton
}

export const createSlider = (formId: string, userOptions: SliderOptions = {}): Slider => {
  if (!hasDom()) {
    return {
      open: () => {},
      close: () => {},
      toggle: () => {},
      refresh: () => {},
      unmount: () => {},
    }
  }

  const { position = SLIDER_POSITION, width = SLIDER_WIDTH, onClose, ...options } = userOptions
  const { iframe, embedId } = createIframe(formId, 'slider', options)
  const scrollInitialState = document.body.style.overflow

  const slider = buildSlider(position)
  const spinner = buildSpinner()
  const wrapper = buildWrapper(position, width)

  wrapper.append(iframe)
  slider.append(spinner)
  slider.append(wrapper)

  const container = options.container || document.body

  iframe.onload = () => {
    wrapper.style[position] = '0'
    setTimeout(() => {
      spinner.style.display = 'none'
    }, 500)

    addCustomKeyboardListener(close)
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

  const unmount = () => {
    unmountElement(slider)
  }

  wrapper.append(buildCloseButton(close))

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  if (options.open && !isOpen(slider)) {
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
