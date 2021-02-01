import { PopupOptions } from './popup-options'
import { createIframe } from './../../utils'

export const createPopup = (formUrl: string, options: PopupOptions) => {
  const iframe = createIframe(formUrl, 'popup', options)

  const popup = document.createElement('div')
  popup.className = 'typeform-popup'
  popup.append(iframe)

  const container = options.container || document.body
  container.append(popup)

  return {
    open: () => popup.classList.add('typeform-popup-opened'),
    close: () => popup.classList.remove('typeform-popup-opened'),
    refresh: () => iframe.contentWindow?.location.reload(),
  }
}
