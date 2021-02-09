export const buildWidget = (iframe: HTMLIFrameElement): HTMLDivElement => {
  const widget = document.createElement('div')
  widget.className = 'typeform-widget'
  widget.append(iframe)
  return widget
}
