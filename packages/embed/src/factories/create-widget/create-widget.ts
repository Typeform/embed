import { createIframe, hasDom, unmountElement } from '../../utils'

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

  const { iframe } = createIframe(formId, 'widget', options)
  const widget = buildWidget(iframe, options.width, options.height)

  options.container.innerHTML = ''
  options.container.append(widget)

  return {
    refresh: () => iframe.contentWindow?.location.reload(),
    unmount: () => unmountElement(widget),
  }
}
