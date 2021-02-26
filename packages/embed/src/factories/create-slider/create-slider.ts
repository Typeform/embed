import { createIframe, hasDom } from '../../utils'
import { SLIDER_POSITION, SLIDER_WIDTH } from '../../constants'

import { SliderOptions } from './slider-options'

export type Slider = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
}

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (popup: HTMLElement): popup is HTMLElementWithParentNode => !!popup.parentNode

const buildSlider = (position: 'right' | 'left') => {
  const popup = document.createElement('div')
  popup.className = `typeform-slider ${position}`
  popup.style.opacity = '0'
  return popup
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  return spinner
}

const buildWrapper = (position: 'right' | 'left', width: number) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-iframe-wrapper'
  wrapper.style[position] = '-100%'
  wrapper.style.width = `${width}px`
  return wrapper
}

const buildCloseButton = (close: () => void) => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = close
  return closeButton
}

export const createSlider = (formId: string, userOptions: SliderOptions): Slider => {
  if (!hasDom()) {
    return {
      open: () => {},
      close: () => {},
      toggle: () => {},
      refresh: () => {},
    }
  }

  const { position = SLIDER_POSITION, width = SLIDER_WIDTH, ...options } = userOptions
  const iframe = createIframe(formId, 'slider', options)

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
  }

  const open = () => {
    if (!isOpen(slider)) {
      container.append(slider)
      setTimeout(() => {
        slider.style.opacity = '1'
      })
    }
  }

  const close = () => {
    if (isOpen(slider)) {
      slider.style.opacity = '0'
      wrapper.style[position] = '-100%'
      setTimeout(() => {
        slider.parentNode.removeChild(slider)
        spinner.style.display = 'block'
      }, 500)
    }
  }

  const toggle = () => {
    isOpen(slider) ? close() : open()
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
