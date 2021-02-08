export const buildPopup = (iframe: HTMLIFrameElement): HTMLDivElement => {
  const popup = document.createElement('div')
  popup.className = 'typeform-popup'
  popup.append(iframe)
  return popup
}
