import { setElementSize } from '../../../utils'
import { WidgetOptions } from '../widget-options'

export const buildWidget = (iframe: HTMLIFrameElement, options: Omit<WidgetOptions, 'container'> = {}): HTMLElement => {
  const { width, height } = options

  const widget = document.createElement('div')
  widget.className = 'typeform-widget'

  widget.append(iframe)

  return setElementSize(widget, { width, height })
}
