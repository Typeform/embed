import { createIframe } from '../../utils'

import { SidetabOptions } from './sidetab-options'

export type Sidetab = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
  unmount: () => void
}

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (element: HTMLElement): element is HTMLElementWithParentNode => !!element.parentNode

const defaultPopupOptions: SidetabOptions = {
  width: 200,
  height: 200,
  buttonText: 'Launch me',
  buttonColor: '#3a7685',
}

const buildSidetab = () => {
  const popup = document.createElement('div')
  popup.className = 'typeform-sidetab'
  return popup
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-sidetab-wrapper'
  return wrapper
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  const icon = document.createElement('div')
  icon.className = 'typeform-sidetab-button-icon'
  icon.append(spinner)
  return icon
}

const buildTriggerButton = () => {
  const button = document.createElement('button')
  button.className = 'typeform-sidetab-button'
  return button
}

const buildTriggerButtonText = () => {
  const text = document.createElement('span')
  text.className = 'typeform-sidetab-button-text'
  text.innerHTML = 'Launch me'
  return text
}

const buildIcon = () => {
  const icon = document.createElement('div')
  icon.className = 'typeform-sidetab-button-icon'
  icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 0H0V9L10.5743 24V16.5H21C22.6567 16.5 24 15.1567 24 13.5V3C24 1.34325 22.6567 0 21 0ZM7.5 9.75C6.672 9.75 6 9.07875 6 8.25C6 7.42125 6.672 6.75 7.5 6.75C8.328 6.75 9 7.42125 9 8.25C9 9.07875 8.328 9.75 7.5 9.75ZM12.75 9.75C11.922 9.75 11.25 9.07875 11.25 8.25C11.25 7.42125 11.922 6.75 12.75 6.75C13.578 6.75 14.25 7.42125 14.25 8.25C14.25 9.07875 13.578 9.75 12.75 9.75ZM18 9.75C17.172 9.75 16.5 9.07875 16.5 8.25C16.5 7.42125 17.172 6.75 18 6.75C18.828 6.75 19.5 7.42125 19.5 8.25C19.5 9.07875 18.828 9.75 18 9.75Z" fill="white"></path>
</svg>`
  return icon
}

const buildCloseIcon = () => {
  const closeButton = document.createElement('div')
  closeButton.className = 'typeform-sidetab-button-icon'
  closeButton.innerHTML = '&times;'
  return closeButton
}

export const createSidetab = (formId: string, options: SidetabOptions = defaultPopupOptions): Sidetab => {
  const iframe = createIframe(formId, 'side-tab', options)

  const sidetab = buildSidetab()
  const wrapper = buildWrapper()
  const spinner = buildSpinner()
  const button = buildTriggerButton()
  const buttonText = buildTriggerButtonText()
  const icon = buildIcon()
  const closeIcon = buildCloseIcon()

  const container = options.container || document.body

  container.append(sidetab)
  sidetab.append(button)
  button.append(icon)
  button.append(buttonText)

  iframe.onload = () => {
    setTimeout(() => {
      sidetab.style.transform = 'translate(0, -50%)'
      sidetab.style.opacity = '1'
      button.removeChild(spinner)
      button.appendChild(closeIcon)
    }, 250)
  }

  const open = () => {
    if (!isOpen(wrapper)) {
      sidetab.append(wrapper)
      wrapper.append(iframe)
      button.removeChild(icon)
      button.appendChild(spinner)
    }
  }

  const close = () => {
    if (isOpen(wrapper)) {
      setTimeout(() => {
        wrapper.parentNode.removeChild(wrapper)
        sidetab.style.transform = 'translate(100%, -50%)'
        button.removeChild(closeIcon)
        button.appendChild(icon)
      }, 250)
    }
  }

  const toggle = () => {
    isOpen(wrapper) ? close() : open()
  }

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  const unmount = () => {
    sidetab.parentNode?.removeChild(sidetab)
  }

  button.onclick = toggle

  return {
    open,
    close,
    toggle,
    refresh,
    unmount,
  }
}
