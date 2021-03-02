import { createIframe } from '../../utils'

import { PopoverOptions } from './popover-options'

export type Popover = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
  unmount: () => void
}

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (popover: HTMLElement): popover is HTMLElementWithParentNode => !!popover.parentNode

const buildPopover = () => {
  const popover = document.createElement('div')
  popover.className = 'typeform-popover'
  popover.style.opacity = '0'
  return popover
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  spinner.style.display = 'none'
  return spinner
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-iframe-wrapper'
  wrapper.style.opacity = '0'
  return wrapper
}

const buildCloseButton = () => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.style.display = 'none'
  closeButton.innerHTML = '&times;'
  return closeButton
}

const buildIcon = (customIcon?: string) => {
  const triggerIcon = document.createElement('div')
  triggerIcon.className = 'typeform-popover-button-icon'
  triggerIcon.innerHTML = customIcon
    ? `<img alt='popover trigger icon button' src='${customIcon}'/>`
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
      <path d="M21 0H0V9L10.5743 24V16.5H21C22.6567 16.5 24 15.1567 24 13.5V3C24 1.34325 22.6567 0 21 0ZM7.5
    9.75C6.672 9.75 6 9.07875 6 8.25C6 7.42125 6.672 6.75 7.5 6.75C8.328 6.75 9 7.42125 9 8.25C9 9.07875 8.328 9.75
    7.5 9.75ZM12.75 9.75C11.922 9.75 11.25 9.07875 11.25 8.25C11.25 7.42125 11.922 6.75 12.75 6.75C13.578 6.75 14.25
    7.42125 14.25 8.25C14.25 9.07875 13.578 9.75 12.75 9.75ZM18 9.75C17.172 9.75 16.5 9.07875 16.5 8.25C16.5 7.42125
    17.172 6.75 18 6.75C18.828 6.75 19.5 7.42125 19.5 8.25C19.5 9.07875 18.828 9.75 18 9.75Z" fill="white"></path>
    </svg>`
  return triggerIcon
}

const buildTriggerButton = (color: string = '#3a7685') => {
  const button = document.createElement('button')
  button.className = 'typeform-popover-button'
  button.style.backgroundColor = color
  return button
}

export const createPopover = (formId: string, options: PopoverOptions): Popover => {
  const closeButton = buildCloseButton()
  const popover = buildPopover()
  const spinner = buildSpinner()
  const wrapper = buildWrapper()

  const iframe = createIframe(formId, 'popover', options)
  const icon = buildIcon(options.customIcon)
  const button = buildTriggerButton(options.buttonColor)

  const container = options.container || document.body

  wrapper.append(iframe)
  popover.append(wrapper)
  button.append(icon)
  container.append(button)

  iframe.onload = () => {
    setTimeout(() => {
      wrapper.style.opacity = '1'
      popover.style.opacity = '1'
      button.removeChild(spinner)
      button.append(closeButton)
      closeButton.style.display = 'block'
    }, 250)
  }

  const open = () => {
    if (!isOpen(popover)) {
      container.append(popover)
      spinner.style.display = 'block'
      button.append(spinner)
      button.removeChild(icon)
    }
  }

  const close = () => {
    if (isOpen(popover)) {
      popover.style.opacity = '0'
      wrapper.style.opacity = '0'
      setTimeout(() => {
        popover.parentNode.removeChild(popover)
        spinner.parentNode?.removeChild(spinner)
        button.removeChild(closeButton)
        button.append(icon)
      }, 250)
    }
  }

  const toggle = () => {
    isOpen(popover) ? close() : open()
  }

  const refresh = () => {
    iframe.contentWindow?.location.reload()
  }

  const unmount = () => {
    popover.parentNode?.removeChild(popover)
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
