import { EmbedType, UrlOptions } from '../../base'

import { buildIframeSrc } from './../build-iframe-src'
import { triggerIframeRedraw } from './trigger-iframe-redraw'

export const createIframe = (formUrl: string, type: EmbedType, options: UrlOptions) => {
  const src = buildIframeSrc(formUrl, type, options)

  const iframe = document.createElement('iframe')
  iframe.src = src
  iframe.addEventListener('load', triggerIframeRedraw, { once: true })

  return iframe
}
