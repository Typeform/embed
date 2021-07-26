import {
  createIframe,
  setElementSize,
  handleCustomOpen,
  unmountElement,
  setAutoClose,
  addCustomKeyboardListener,
} from '../../utils'

import { SidetabOptions } from './sidetab-options'

export type Sidetab = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
  unmount: () => void
}

const defaultOptions = {
  buttonColor: '#3a7685',
  buttonText: 'Launch me',
}

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (element: HTMLElement): element is HTMLElementWithParentNode => !!element.parentNode

const buildSidetab = (width?: number, height?: number) => {
  const popup = document.createElement('div')
  popup.className = 'typeform-sidetab'
  popup.dataset.testid = 'typeform-sidetab'
  return setElementSize(popup, { width, height })
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-sidetab-wrapper'
  wrapper.dataset.testid = 'typeform-sidetab-wrapper'
  return wrapper
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  const icon = document.createElement('div')
  icon.className = 'typeform-sidetab-button-icon'
  icon.dataset.testid = 'spinner-icon'
  icon.append(spinner)
  return icon
}

const buildTriggerButton = (color: string) => {
  const button = document.createElement('button')
  button.className = 'typeform-sidetab-button'
  button.style.backgroundColor = color
  return button
}

const buildTriggerButtonText = (text: string) => {
  const buttonText = document.createElement('span')
  buttonText.className = 'typeform-sidetab-button-text'
  buttonText.innerHTML = text
  return buttonText
}

const buildIcon = (customIcon?: string) => {
  const triggerIcon = document.createElement('div')
  triggerIcon.className = 'typeform-sidetab-button-icon'
  triggerIcon.innerHTML = customIcon
    ? `<img alt='sidetab trigger icon button' src='${customIcon}' style="max-width: 100%; max-height: 100%" />`
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 0H0V9L10.5743 24V16.5H21C22.6567 16.5 24 15.1567 24 13.5V3C24 1.34325 22.6567 0 21 0ZM7.5 9.75C6.672 9.75 6 9.07875 6 8.25C6 7.42125 6.672 6.75 7.5 6.75C8.328 6.75 9 7.42125 9 8.25C9 9.07875 8.328 9.75 7.5 9.75ZM12.75 9.75C11.922 9.75 11.25 9.07875 11.25 8.25C11.25 7.42125 11.922 6.75 12.75 6.75C13.578 6.75 14.25 7.42125 14.25 8.25C14.25 9.07875 13.578 9.75 12.75 9.75ZM18 9.75C17.172 9.75 16.5 9.07875 16.5 8.25C16.5 7.42125 17.172 6.75 18 6.75C18.828 6.75 19.5 7.42125 19.5 8.25C19.5 9.07875 18.828 9.75 18 9.75Z" fill="white"></path>
</svg>`
  triggerIcon.dataset.testid = 'default-icon'
  return triggerIcon
}

const buildCloseIcon = (element = 'div', className = 'typeform-sidetab-button-icon') => {
  const closeButton = document.createElement(element)
  closeButton.className = className
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
  const options = { ...defaultOptions, ...userOptions }
  const { iframe, embedId } = createIframe(formId, 'side-tab', options)

  const sidetab = buildSidetab(options.width, options.height)
  const wrapper = buildWrapper()
  const spinner = buildSpinner()
  const button = buildTriggerButton(options.buttonColor || defaultOptions.buttonColor)
  const buttonText = buildTriggerButtonText(options.buttonText || defaultOptions.buttonText)
  const icon = buildIcon(options.customIcon)
  const closeIcon = buildCloseIcon()
  const closeModal = buildCloseIcon('a', 'typeform-sidetab-close')

  const container = document.body

  container.append(sidetab)
  wrapper.append(iframe)
  sidetab.append(button)
  sidetab.append(closeModal)
  button.append(icon)
  button.append(buttonText)

  setTimeout(() => {
    sidetab.classList.add('ready')
  }, 250)

  iframe.onload = () => {
    sidetab.classList.add('open')
    replaceElementChild(spinner, closeIcon)
    addCustomKeyboardListener(close)
  }

  const open = () => {
    if (!isOpen(wrapper)) {
      sidetab.append(wrapper)
      replaceElementChild(icon, spinner)
    }
  }

  const close = () => {
    if (isOpen(wrapper)) {
      sidetab.classList.remove('open')
      setTimeout(() => {
        unmountElement(wrapper)
        replaceElementChild(closeIcon, icon)
      }, 250)
    }
  }

  setAutoClose(embedId, options.autoClose, close)

  const toggle = () => {
    isOpen(wrapper) ? close() : open()
  }

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  const unmount = () => {
    unmountElement(sidetab)
  }

  button.onclick = toggle
  closeModal.onclick = close

  if (options.open && !isOpen(wrapper)) {
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
