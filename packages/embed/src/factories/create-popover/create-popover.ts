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
  makeAutoResize,
} from '../../utils'
import type { RemoveHandler } from '../../utils'

import { PopoverOptions } from './popover-options'
import { buildNotificationDot, canBuildNotificationDot, saveNotificationDotHideUntilTime } from './notification-days'

export type Popover = {
  open: () => void
  close: () => void
  toggle: () => void
  refresh: () => void
  unmount: () => void
}

const replaceIcon = (iconToReplace: HTMLElement, newIcon: HTMLElement) => {
  const element = iconToReplace.parentNode
  if (element) {
    element.removeChild(iconToReplace)
    element.appendChild(newIcon)
  }
}

const buildPopover = (width?: number, height?: number) => {
  const popover = document.createElement('div')
  popover.className = 'tf-v1-popover'
  popover.dataset.testid = 'tf-v1-popover'
  return setElementSize(popover, { width, height })
}

const buildCloseIcon = (element = 'div', className = 'tf-v1-popover-button-icon') => {
  const icon = document.createElement(element)
  icon.className = `${className} tf-v1-close-icon`
  icon.innerHTML = '&times;'
  icon.dataset.testid = className
  return icon
}

const buildWrapper = () => {
  const wrapper = document.createElement('div')
  wrapper.className = 'tf-v1-popover-wrapper'
  wrapper.dataset.testid = 'tf-v1-popover-wrapper'
  return wrapper
}

const buildSpinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'tf-v1-spinner'
  const icon = document.createElement('div')
  icon.className = 'tf-v1-popover-button-icon'
  icon.dataset.testid = 'spinner-icon'
  icon.append(spinner)
  return icon
}

const buildIcon = (customIcon?: string, color?: string) => {
  const fillColor = getTextColor(color)
  const triggerIcon = document.createElement('div')
  triggerIcon.className = 'tf-v1-popover-button-icon'

  const svgIcon = `<svg class="default" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 0H0V9L10.5743 24V16.5H21C22.6567 16.5 24 15.1567 24 13.5V3C24 1.34325 22.6567 0 21 0ZM7.5
    9.75C6.672 9.75 6 9.07875 6 8.25C6 7.42125 6.672 6.75 7.5 6.75C8.328 6.75 9 7.42125 9 8.25C9 9.07875 8.328 9.75
    7.5 9.75ZM12.75 9.75C11.922 9.75 11.25 9.07875 11.25 8.25C11.25 7.42125 11.922 6.75 12.75 6.75C13.578 6.75 14.25
    7.42125 14.25 8.25C14.25 9.07875 13.578 9.75 12.75 9.75ZM18 9.75C17.172 9.75 16.5 9.07875 16.5 8.25C16.5 7.42125
    17.172 6.75 18 6.75C18.828 6.75 19.5 7.42125 19.5 8.25C19.5 9.07875 18.828 9.75 18 9.75Z" fill="${fillColor}"></path>
  </svg>`

  const isUrlIcon = customIcon?.startsWith('http')
  triggerIcon.innerHTML = isUrlIcon
    ? `<img alt='popover trigger icon button' src='${customIcon}'/>`
    : customIcon ?? svgIcon

  triggerIcon.dataset.testid = 'default-icon'
  return triggerIcon
}

const buildTriggerButton = (color: string) => {
  const textColor = getTextColor(color)
  const button = document.createElement('button')
  button.className = 'tf-v1-popover-button'
  button.dataset.testid = 'tf-v1-popover-button'
  button.style.backgroundColor = color
  button.style.color = textColor
  return button
}

const buildTooltip = (message: string, hide: () => void) => {
  const icon = document.createElement('span')
  icon.className = 'tf-v1-popover-tooltip-close'
  icon.dataset.testid = 'tf-v1-popover-tooltip-close'
  icon.innerHTML = '&times;'
  icon.onclick = hide

  const textContainer = document.createElement('div')
  textContainer.className = 'tf-v1-popover-tooltip-text'
  textContainer.innerHTML = message

  const container = document.createElement('div')
  container.className = 'tf-v1-popover-tooltip'
  container.dataset.testid = 'tf-v1-popover-tooltip'
  container.appendChild(textContainer)
  container.appendChild(icon)
  return container
}

const defaultOptions = {
  buttonColor: '#3a7685',
}

export const createPopover = (formId: string, userOptions: PopoverOptions = {}): Popover => {
  const options = { ...defaultOptions, ...userOptions }
  const { iframe, embedId, refresh } = createIframe(formId, 'popover', options)

  let openHandler: RemoveHandler

  const popover = buildPopover(options.width, options.height)
  const wrapper = buildWrapper()
  const icon = buildIcon(options.customIcon, options.buttonColor || defaultOptions.buttonColor)
  const spinner = buildSpinner()
  const closeIcon = buildCloseIcon()
  const closeModal = buildCloseIcon('a', 'tf-v1-popover-close')
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

  const autoResize = makeAutoResize(popover)

  const open = () => {
    if (!isOpen(wrapper)) {
      hideTooltip()
      hideNotificationDot()
      autoResize()
      window.addEventListener('resize', autoResize)
      setTimeout(() => {
        if (!isInPage(wrapper)) {
          popover.append(wrapper)
          replaceIcon(icon, spinner)
          wrapper.style.opacity = '0'
          closeModal.style.opacity = '0'
        } else {
          wrapper.style.opacity = '0'
          closeModal.style.opacity = '0'
          wrapper.style.display = 'flex'
          setTimeout(() => {
            popover.classList.add('open')
            wrapper.style.opacity = '1'
            closeModal.style.opacity = '1'
          })
          replaceIcon(icon, closeIcon)
        }
      })
    }
  }

  const close = () => {
    if (isOpen(popover)) {
      userOptions.onClose?.()
      setTimeout(() => {
        if (options.keepSession) {
          wrapper.style.display = 'none'
        } else {
          unmountElement(wrapper)
        }
        popover.classList.remove('open')
        replaceIcon(closeIcon, icon)
      }, 250)
    }
  }

  setAutoClose(embedId, options.autoClose, close)

  const toggle = () => {
    isOpen(wrapper) ? close() : open()
  }

  const unmount = () => {
    unmountElement(popover)
    window.removeEventListener('resize', autoResize)
    if (options.open && openHandler?.remove) {
      openHandler.remove()
    }
  }

  button.onclick = toggle
  closeModal.onclick = close

  if (options.open && !isOpen(wrapper)) {
    openHandler = handleCustomOpen(open, options.open, options.openValue)
  }

  return {
    open,
    close,
    toggle,
    refresh,
    unmount,
  }
}
