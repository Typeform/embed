import { setElementSize } from '../../../utils'

export const buildWidget = (
  iframe: HTMLIFrameElement,
  width?: number | string,
  height?: number | string
): HTMLElement => {
  const widget = document.createElement('div')
  widget.className = 'tf-v1-widget'
  widget.dataset.testid = 'tf-v1-widget'

  widget.append(iframe)

  if (typeof height === 'string' && height.endsWith('%')) {
    iframe.style.minHeight = '350px'
  }

  return setElementSize(widget, { width, height })
}
