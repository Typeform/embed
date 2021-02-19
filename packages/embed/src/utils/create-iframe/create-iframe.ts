import { EmbedType, UrlOptions, ActionableOptions } from '../../base'
import { buildIframeSrc } from '../build-iframe-src'

import { generateEmbedId } from './generate-embed-id'
import { getFormReadyHandler, getFormScreenChangedHandler, getFormSubmitHandler } from './get-form-event-handler'
import { triggerIframeRedraw } from './trigger-iframe-redraw'

export const createIframe = (formId: string, type: EmbedType, options: CreateIframeOptions) => {
  const embedId = generateEmbedId()
  const src = buildIframeSrc({ formId, embedId, type, options })

  const iframe = document.createElement('iframe')
  iframe.src = src
  iframe.addEventListener('load', triggerIframeRedraw, { once: true })

  window.addEventListener('form-ready', getFormReadyHandler(embedId, options))
  window.addEventListener('form-screen-changed', getFormScreenChangedHandler(embedId, options))
  window.addEventListener('form-submit', getFormSubmitHandler(embedId, options))

  return iframe
}

type CreateIframeOptions = UrlOptions & ActionableOptions
