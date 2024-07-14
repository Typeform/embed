import {
  createIframe,
  setElementSize,
  handleCustomOpen,
  unmountElement,
  setAutoClose,
  addCustomKeyboardListener,
  getTextColor,
  isOpen,
  isInPage,
  invokeWithoutDefault,
  addAttributesToElement,
  getValueWithUnits,
  handlePreventReopenOnClose,
} from '../../utils'
import type { RemoveHandler } from '../../utils'
import { ButtonProps, EmbedPopup } from '../../base'

import { SidetabOptions } from './sidetab-options'

export type Sidetab = EmbedPopup

const defaultOptions = {
  buttonColor: '#3a7685',
  buttonText: 'Launch me',
}

const buildSidetab = (
  width?: number | string,
  height?: number | string,
  top?: number | string,
  bottom?: number | string
) => {
  const sidetab = document.createElement('div')
  sidetab.className = 'tf-v1-sidetab'
  sidetab.dataset.testid = 'tf-v1-sidetab'

  setElementSize(sidetab, { width, height })

  const DEFAULT_CSS_HEIGHT = 580
  if (top !== undefined) {
    sidetab.style.top = `calc(${getValueWithUnits(top)} + ${getValueWithUnits(height || DEFAULT_CSS_HEIGHT)} / 2)`
    sidetab.style.bottom = 'auto'
  } else if (bottom !== undefined) {
    sidetab.style.top = 'auto'
    sidetab.style.bottom = `calc(${getValueWithUnits(bottom)} - ${getValueWithUnits(height || DEFAULT_CSS_HEIGHT)} / 2)`
  }

  return sidetab
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'tf-v1-sidetab-wrapper'
  wrapper.dataset.testid = 'tf-v1-sidetab-wrapper'
  return wrapper
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'tf-v1-spinner'
  const icon = document.createElement('div')
  icon.className = 'tf-v1-sidetab-button-icon'
  icon.dataset.testid = 'spinner-icon'
  icon.append(spinner)
  return icon
}

const buildTriggerButton = ({
  backgroundColor,
  textColor,
  width,
  height,
  align = 'center',
  buttonProps = {},
}: {
  backgroundColor: string
  textColor?: string
  width?: number | string
  height?: number | string
  align?: 'top' | 'center' | 'bottom'
  buttonProps?: ButtonProps
}) => {
  const button = document.createElement('button')
  button.className = 'tf-v1-sidetab-button'
  button.style.backgroundColor = backgroundColor
  button.style.color = textColor || getTextColor(backgroundColor)
  addAttributesToElement(button, buttonProps)
  setElementSize(button, { width, height })

  if (height) {
    button.style.left = `-${getValueWithUnits(height)}`
  }

  const DEFUALT_CSS_HEIGHT = 48
  if (align === 'top') {
    button.style.transform = 'rotate(-90deg) translateX(-100%)'
    button.style.top = '0'
  } else if (align === 'bottom') {
    button.style.transform = 'rotate(-90deg) translateX(0)'
    button.style.top = 'auto'
    button.style.bottom = `-${getValueWithUnits(height || DEFUALT_CSS_HEIGHT)}`
  }

  return button
}

const buildTriggerButtonText = (text: string, size?: number | string) => {
  const buttonText = document.createElement('span')
  buttonText.className = 'tf-v1-sidetab-button-text'
  buttonText.innerHTML = text
  if (size) {
    buttonText.style.fontSize = getValueWithUnits(size)
  }
  return buttonText
}

const buildIcon = (customIcon?: string, backgroundColor?: string, textColor?: string, size?: number | string) => {
  const fillColor = textColor || getTextColor(backgroundColor)
  const triggerIcon = document.createElement('div')
  triggerIcon.className = 'tf-v1-sidetab-button-icon'

  if (size) {
    triggerIcon.style.width = getValueWithUnits(size)
    triggerIcon.style.height = getValueWithUnits(size)
  }

  const svgIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 0H0V9L10.5743 24V16.5H21C22.6567 16.5 24 15.1567 24 13.5V3C24 1.34325 22.6567 0 21 0ZM7.5 9.75C6.672 9.75 6 9.07875 6 8.25C6 7.42125 6.672 6.75 7.5 6.75C8.328 6.75 9 7.42125 9 8.25C9 9.07875 8.328 9.75 7.5 9.75ZM12.75 9.75C11.922 9.75 11.25 9.07875 11.25 8.25C11.25 7.42125 11.922 6.75 12.75 6.75C13.578 6.75 14.25 7.42125 14.25 8.25C14.25 9.07875 13.578 9.75 12.75 9.75ZM18 9.75C17.172 9.75 16.5 9.07875 16.5 8.25C16.5 7.42125 17.172 6.75 18 6.75C18.828 6.75 19.5 7.42125 19.5 8.25C19.5 9.07875 18.828 9.75 18 9.75Z" fill="${fillColor}"></path>
  </svg>`

  const isUrlIcon = customIcon?.startsWith('http')
  triggerIcon.innerHTML = isUrlIcon
    ? `<img alt='popover trigger icon button' src='${customIcon}'/>`
    : customIcon ?? svgIcon

  triggerIcon.dataset.testid = 'default-icon'
  return triggerIcon
}

const buildCloseIcon = (element = 'div', className = 'tf-v1-sidetab-button-icon') => {
  const closeButton = document.createElement(element)
  closeButton.className = `${className} tf-v1-close-icon`
  closeButton.innerHTML = '&times;'
  closeButton.dataset.testid = className
  return closeButton
}

const replaceElementChild = (childToReplace: HTMLElement, newChild: HTMLElement) => {
  const element = childToReplace.parentNode
  if (element) {
    element.removeChild(childToReplace)
    element.appendChild(newChild)
  }
}

export const createSidetab = (formId: string, userOptions: SidetabOptions = {}): Sidetab => {
  const { domain, ...options } = { ...defaultOptions, ...userOptions }
  const { iframe, embedId, refresh, focus } = createIframe('side-tab', { formId, domain, options })
  const sidetab = buildSidetab(options.width, options.height, options.top, options.bottom)
  const wrapper = buildWrapper()
  const spinner = buildSpinner()
  const button = buildTriggerButton({
    backgroundColor: options.buttonColor || defaultOptions.buttonColor,
    textColor: options.buttonTextColor,
    width: options.buttonHeight, // buttonHeight becomes width after rotation
    height: options.buttonWidth, // buttonWidth becomes height after rotation
    align: options.buttonAlign,
    buttonProps: options.buttonProps,
  })
  const buttonText = buildTriggerButtonText(options.buttonText || defaultOptions.buttonText, options.buttonTextSize)
  const icon = buildIcon(
    options.customIcon,
    options.buttonColor || defaultOptions.buttonColor,
    options.buttonTextColor,
    options.buttonTextSize
  )
  const closeIcon = buildCloseIcon()
  const closeModal = buildCloseIcon('button', 'tf-v1-sidetab-close')

  const container = options.container || document.body
  let openHandler: RemoveHandler

  container.append(sidetab)
  wrapper.append(iframe)
  sidetab.append(button)
  sidetab.append(closeModal)
  button.append(icon)
  button.append(buttonText)

  setTimeout(() => {
    sidetab.classList.add('ready')
  }, 250)

  iframe.onload = (event) => {
    if (event?.isTrusted) {
      sidetab.classList.add('open')
      replaceElementChild(spinner, closeIcon)
      addCustomKeyboardListener(close)
    }
  }

  const open = () => {
    if (!isOpen(wrapper)) {
      if (!isInPage(wrapper)) {
        sidetab.append(wrapper)
        replaceElementChild(icon, spinner)
      } else {
        wrapper.style.display = 'flex'
        sidetab.classList.add('open')
        replaceElementChild(icon, closeIcon)
      }
    }
  }

  const close = () => {
    if (isOpen(wrapper)) {
      handlePreventReopenOnClose(options, formId)
      options.onClose?.()
      sidetab.classList.remove('open')
      setTimeout(() => {
        if (options.keepSession) {
          wrapper.style.display = 'none'
        } else {
          unmountElement(wrapper)
        }
        replaceElementChild(closeIcon, icon)
      }, 250)
    }
  }

  setAutoClose(embedId, options.autoClose, close)

  const toggle = () => {
    isOpen(wrapper) ? close() : open()
  }

  button.onclick = invokeWithoutDefault(toggle)
  closeModal.onclick = invokeWithoutDefault(close)

  if (options.open && !isOpen(wrapper)) {
    openHandler = handleCustomOpen(open, options, formId)
  }

  const unmount = () => {
    unmountElement(sidetab)
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
