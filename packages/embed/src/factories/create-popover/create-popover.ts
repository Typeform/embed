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
  handlePreventReopenOnClose,
  closeIconSvg,
  triggerIconSvg,
} from '../../utils'
import type { RemoveHandler } from '../../utils'
import { ButtonProps, EmbedPopup } from '../../base'

import { PopoverOptions } from './popover-options'
import { buildNotificationDot, canBuildNotificationDot, saveNotificationDotHideUntilTime } from './notification-days'

export type Popover = EmbedPopup

const replaceIcon = (iconToReplace: HTMLElement, newIcon: HTMLElement) => {
  const element = iconToReplace.parentNode
  if (element) {
    element.removeChild(iconToReplace)
    element.appendChild(newIcon)
  }
}

const buildPopover = (width?: number | string, height?: number | string) => {
  const popover = document.createElement('div')
  popover.className = 'tf-v1-popover'
  popover.dataset.testid = 'tf-v1-popover'
  return setElementSize(popover, { width, height })
}

const buildCloseIcon = (element = 'span', className = 'tf-v1-popover-button-icon') => {
  const icon = document.createElement(element)
  icon.className = `${className} tf-v1-close-icon`
  icon.innerHTML = closeIconSvg
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

  const svgIcon = triggerIconSvg(fillColor)

  const isUrlIcon = customIcon?.startsWith('http')
  triggerIcon.innerHTML = isUrlIcon
    ? `<img alt='popover trigger icon button' src='${customIcon}'/>`
    : customIcon ?? svgIcon

  triggerIcon.dataset.testid = 'default-icon'
  return triggerIcon
}

const buildTriggerButton = (color: string, buttonProps: ButtonProps = {}) => {
  const textColor = getTextColor(color)
  const button = document.createElement('button')
  button.className = 'tf-v1-popover-button'
  button.dataset.testid = 'tf-v1-popover-button'
  button.style.backgroundColor = color
  button.style.color = textColor
  addAttributesToElement(button, buttonProps)
  return button
}

const buildTooltip = (message: string, hide: () => void) => {
  const icon = document.createElement('span')
  icon.className = 'tf-v1-popover-tooltip-close'
  icon.dataset.testid = 'tf-v1-popover-tooltip-close'
  icon.innerHTML = closeIconSvg
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
  const { domain, ...options } = { ...defaultOptions, ...userOptions }
  const { iframe, embedId, refresh, focus } = createIframe('popover', { formId, domain, options })

  let openHandler: RemoveHandler

  const popover = buildPopover(options.width, options.height)
  const wrapper = buildWrapper()
  const icon = buildIcon(options.customIcon, options.buttonColor || defaultOptions.buttonColor)
  const spinner = buildSpinner()
  const closeIcon = buildCloseIcon()
  const closeModal = buildCloseIcon('button', 'tf-v1-popover-close')
  const button = buildTriggerButton(options.buttonColor || defaultOptions.buttonColor, options.buttonProps)

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

  iframe.onload = (event) => {
    if (event?.isTrusted) {
      popover.classList.add('open')
      wrapper.style.opacity = '1'
      closeModal.style.opacity = '1'
      replaceIcon(spinner, closeIcon)
      addCustomKeyboardListener(close)
    }
  }

  const open = () => {
    if (!isOpen(wrapper)) {
      hideTooltip()
      hideNotificationDot()
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
      handlePreventReopenOnClose(options, formId)
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
    if (options.open && openHandler?.remove) {
      openHandler.remove()
    }
  }

  button.onclick = invokeWithoutDefault(toggle)
  closeModal.onclick = invokeWithoutDefault(close)

  if (options.open && !isOpen(wrapper)) {
    openHandler = handleCustomOpen(open, options, formId)
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
