import { EmbedType, UrlOptions, ActionableOptions } from '../../base'
import { buildIframeSrc } from '../build-iframe-src'

import { getFormReadyHandler, getFormQuestionChangedHandler, getFormSubmitHandler } from './get-form-event-handler'
import { triggerIframeRedraw } from './trigger-iframe-redraw'

export const createIframe = (formId: string, type: EmbedType, embedId: string, options: CreateIframeOptions) => {
  const src = buildIframeSrc({ formId, embedId, type, options })

  const iframe = document.createElement('iframe')
  iframe.src = src
  iframe.addEventListener('load', triggerIframeRedraw, { once: true })

  window.addEventListener('message', getFormReadyHandler(embedId, options))
  window.addEventListener('message', getFormQuestionChangedHandler(embedId, options))
  window.addEventListener('message', getFormSubmitHandler(embedId, options))

  return iframe
}

type CreateIframeOptions = UrlOptions & ActionableOptions
