import { WidgetOptions } from './widget-options'
import { createIframe } from './../../utils'

export const createWidget = (formUrl: string, options: WidgetOptions) => {
  const iframe = createIframe(formUrl, 'widget', options)

  const popup = document.createElement('div')
  popup.className = 'typeform-widget'
  popup.append(iframe)

  const container = options.container || document.body
  container.append(popup)

  return {
    refresh: () => iframe.contentWindow?.location.reload(),
  }
}
