import { createIframe, hasDom, isFullscreen, unmountElement } from '../../utils'

import { WidgetOptions } from './widget-options'
import { buildWidget } from './elements'

export type Widget = {
  refresh: () => void
  unmount: () => void
}

export const createWidget = (formId: string, options: WidgetOptions): Widget => {
  if (!hasDom()) {
    return {
      refresh: () => {},
      unmount: () => {},
    }
  }

  const widgetOptions = options
  if (isFullscreen()) {
    widgetOptions.enableFullscreen = true
  }

  const { iframe } = createIframe(formId, 'widget', widgetOptions)
  const widget = buildWidget(iframe, options.width, options.height)

  options.container.innerHTML = ''
  options.container.append(widget)

  return {
    refresh: () => iframe.contentWindow?.location.reload(),
    unmount: () => unmountElement(widget),
  }
}
