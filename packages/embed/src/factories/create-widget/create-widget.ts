import { createIframe, hasDom, isFullscreen, unmountElement } from '../../utils'
import { getWelcomeScreenHiddenHandler } from '../../utils/create-iframe/get-form-event-handler'

import { WidgetOptions } from './widget-options'
import { buildWidget } from './elements'

export type Widget = {
  refresh: () => void
  unmount: () => void
}

const buildCloseButton = () => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-widget-close'
  closeButton.innerHTML = '&times;'
  return closeButton
}

export const createWidget = (formId: string, options: WidgetOptions): Widget => {
  if (!hasDom()) {
    return {
      refresh: () => {},
      unmount: () => {},
    }
  }

  const widgetOptions = options

  if (isFullscreen() && !options.inlineOnMobile) {
    widgetOptions.enableFullscreen = true
    widgetOptions.forceTouch = true
  }

  const { embedId, iframe } = createIframe(formId, 'widget', widgetOptions)
  const widget = buildWidget(iframe, options.width, options.height)

  options.container.innerHTML = ''
  options.container.append(widget)

  if (widgetOptions.enableFullscreen) {
    const { container } = options
    window.addEventListener('message', getWelcomeScreenHiddenHandler(embedId, container))
    const closeButton = buildCloseButton()

    const close = () => {
      container.classList.remove('typeform-widget-fullscreen')
      options.container.innerHTML = ''
      options.container.append(widget)
      container.append(closeButton)
    }

    closeButton.onclick = close
    container.append(closeButton)
  }

  return {
    refresh: () => iframe.contentWindow?.location.reload(),
    unmount: () => unmountElement(widget),
  }
}
