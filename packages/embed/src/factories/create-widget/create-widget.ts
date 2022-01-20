import { createIframe, hasDom, isFullscreen, unmountElement, lazyInitialize } from '../../utils'
import { getWelcomeScreenHiddenHandler } from '../../utils/create-iframe/get-form-event-handler'

import { WidgetOptions } from './widget-options'
import { buildWidget } from './elements'

export type Widget = {
  refresh: () => void
  unmount: () => void
}

const buildCloseButton = () => {
  const closeButton = document.createElement('a')
  closeButton.className = 'tf-v1-widget-close'
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

  if (!options.inlineOnMobile && (options.forceTouch || isFullscreen())) {
    widgetOptions.enableFullscreen = true
    widgetOptions.forceTouch = true
  }

  const { embedId, iframe, refresh } = createIframe(formId, 'widget', widgetOptions)
  const widget = buildWidget(iframe, options.width, options.height)

  const appendWidget = () => options.container.append(widget)

  options.container.innerHTML = ''

  if (options.lazy) {
    lazyInitialize(options.container, appendWidget)
  } else {
    appendWidget()
  }

  if (widgetOptions.enableFullscreen) {
    const { container } = options
    window.addEventListener('message', getWelcomeScreenHiddenHandler(embedId, container))
    const closeButton = buildCloseButton()

    const close = () => {
      options.onClose?.()
      container.classList.remove('tf-v1-widget-fullscreen')

      if (options.keepSession) {
        const overlay = document.createElement('div')
        overlay.className = 'tf-v1-widget-iframe-overlay'
        overlay.onclick = () => {
          container.classList.add('tf-v1-widget-fullscreen')
          unmountElement(overlay)
        }
        widget.append(overlay)
      } else {
        options.container.innerHTML = ''
        appendWidget()
        container.append(closeButton)
      }
    }

    closeButton.onclick = close
    container.append(closeButton)
  }

  return {
    refresh,
    unmount: () => unmountElement(widget),
  }
}
