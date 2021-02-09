export const buildFullpage = (iframe: HTMLIFrameElement): HTMLDivElement => {
  iframe.width = '100%'
  iframe.height = '100%'

  const widget = document.createElement('div')
  widget.className = 'typeform-fullpage'
  widget.append(iframe)
  return widget
}
