import {
  createIframe,
  setElementSize,
  handleCustomOpen,
  unmountElement,
  setAutoClose,
  addCustomKeyboardListener,
} from '../../utils'

import { PopoverOptions } from './popover-options'
import { buildNotificationDot, canBuildNotificationDot, saveNotificationDotHideUntilTime } from './notification-days'

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

const replaceIcon = (iconToReplace: HTMLElement, newIcon: HTMLElement) => {
  const element = iconToReplace.parentNode
  if (element) {
    element.removeChild(iconToReplace)
    element.appendChild(newIcon)
  }
}

const buildPopover = (width?: number, height?: number) => {
  const popover = document.createElement('div')
  popover.className = 'typeform-popover'
  popover.dataset.testid = 'typeform-popover'
  return setElementSize(popover, { width, height })
}

const buildCloseIcon = (element = 'div', className = 'typeform-popover-button-icon') => {
  const icon = document.createElement(element)
  icon.className = className
  icon.innerHTML = '&times;'
  icon.dataset.testid = className
  return icon
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'typeform-popover-wrapper'
  wrapper.dataset.testid = 'typeform-popover-wrapper'
  return wrapper
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'typeform-spinner'
  const icon = document.createElement('div')
  icon.className = 'typeform-popover-button-icon'
  icon.dataset.testid = 'spinner-icon'
  icon.append(spinner)
  return icon
}

const buildIcon = (customIcon?: string) => {
  const triggerIcon = document.createElement('div')
  triggerIcon.className = 'typeform-popover-button-icon'
  triggerIcon.innerHTML = customIcon
    ? `<img alt='popover trigger icon button' style='max-width: 32px; max-height:32px;' src='${customIcon}'/>`
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
      <path d="M21 0H0V9L10.5743 24V16.5H21C22.6567 16.5 24 15.1567 24 13.5V3C24 1.34325 22.6567 0 21 0ZM7.5
    9.75C6.672 9.75 6 9.07875 6 8.25C6 7.42125 6.672 6.75 7.5 6.75C8.328 6.75 9 7.42125 9 8.25C9 9.07875 8.328 9.75
    7.5 9.75ZM12.75 9.75C11.922 9.75 11.25 9.07875 11.25 8.25C11.25 7.42125 11.922 6.75 12.75 6.75C13.578 6.75 14.25
    7.42125 14.25 8.25C14.25 9.07875 13.578 9.75 12.75 9.75ZM18 9.75C17.172 9.75 16.5 9.07875 16.5 8.25C16.5 7.42125
    17.172 6.75 18 6.75C18.828 6.75 19.5 7.42125 19.5 8.25C19.5 9.07875 18.828 9.75 18 9.75Z" fill="white"></path>
    </svg>`
  triggerIcon.dataset.testid = 'default-icon'
  return triggerIcon
}

const buildTriggerButton = (color: string) => {
  const button = document.createElement('button')
  button.className = 'typeform-popover-button'
  button.dataset.testid = 'typeform-popover-button'
  button.style.backgroundColor = color
  return button
}

const buildTooltip = (message: string, hide: () => void) => {
  const icon = document.createElement('span')
  icon.className = 'typeform-popover-tooltip-close'
  icon.dataset.testid = 'typeform-popover-tooltip-close'
  icon.innerHTML = '&times;'
  icon.onclick = hide

  const textContainer = document.createElement('div')
  textContainer.className = 'typeform-popover-tooltip-text'
  textContainer.innerHTML = message

  const container = document.createElement('div')
  container.className = 'typeform-popover-tooltip'
  container.dataset.testid = 'typeform-popover-tooltip'
  container.appendChild(textContainer)
  container.appendChild(icon)
  return container
}

const defaultOptions = {
  buttonColor: '#3a7685',
}

export const createPopover = (formId: string, userOptions: PopoverOptions = {}): Popover => {
  const options = { ...defaultOptions, ...userOptions }
  const { iframe, embedId } = createIframe(formId, 'popover', options)

  const popover = buildPopover(options.width, options.height)
  const wrapper = buildWrapper()
  const icon = buildIcon(options.customIcon)
  const spinner = buildSpinner()
  const closeIcon = buildCloseIcon()
  const closeModal = buildCloseIcon('a', 'typeform-popover-close')
  const button = buildTriggerButton(options.buttonColor || defaultOptions.buttonColor)

  const container = options.container || document.body

  container.append(popover)
  wrapper.append(iframe)
  popover.append(button)
  popover.append(closeModal)
  button.append(icon)

  let tooltip: HTMLDivElement
  let notificationDot: HTMLSpanElement

  const hideTooltip = () => {
    if (tooltip && tooltip.parentNode) {
      tooltip.classList.add('closing')
      setTimeout(() => {
        unmountElement(tooltip)
      }, 250)
    }
  }

  const hideNotificationDot = () => {
    if (notificationDot) {
      notificationDot.classList.add('closing')

      if (options.notificationDays && !options.enableSandbox) {
        saveNotificationDotHideUntilTime(formId, options.notificationDays)
      }

      setTimeout(() => {
        unmountElement(notificationDot)
      }, 250)
    }
  }

  if (options.tooltip && options.tooltip.length > 0) {
    tooltip = buildTooltip(options.tooltip, hideTooltip)
    popover.append(tooltip)
  }

  if (options.notificationDays && (options.enableSandbox || canBuildNotificationDot(formId))) {
    notificationDot = buildNotificationDot()
    button.append(notificationDot)
  }

  iframe.onload = () => {
    popover.classList.add('open')
    wrapper.style.opacity = '1'
    closeModal.style.opacity = '1'
    replaceIcon(spinner, closeIcon)
    addCustomKeyboardListener(close)
  }

  const open = () => {
    if (!isOpen(wrapper)) {
      hideTooltip()
      hideNotificationDot()
      setTimeout(() => {
        popover.append(wrapper)
        wrapper.style.opacity = '0'
        closeModal.style.opacity = '0'
        replaceIcon(icon, spinner)
      })
    }
  }

  const close = () => {
    if (isOpen(popover)) {
      setTimeout(() => {
        unmountElement(wrapper)
        popover.classList.remove('open')
        replaceIcon(closeIcon, icon)
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
    unmountElement(popover)
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
