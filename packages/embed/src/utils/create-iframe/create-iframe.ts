import { EmbedType, UrlOptions, ActionableOptions } from '../../base'
import { buildIframeSrc } from '../build-iframe-src'
import { setupGaInstance } from '../'

import { generateEmbedId } from './generate-embed-id'
import { getFormReadyHandler, getFormQuestionChangedHandler, getFormSubmitHandler } from './get-form-event-handler'
import { triggerIframeRedraw } from './trigger-iframe-redraw'
import { dispatchCustomKeyEventFromIframe } from './setup-custom-keyboard-close'

export const createIframe = (formId: string, type: EmbedType, options: CreateIframeOptions) => {
  const embedId = generateEmbedId()
  const src = buildIframeSrc({ formId, embedId, type, options })

  const iframe = document.createElement('iframe')
  iframe.src = src
  iframe.dataset.testid = 'iframe'
  iframe.addEventListener('load', triggerIframeRedraw, { once: true })

  window.addEventListener('message', getFormReadyHandler(embedId, options.onReady))
  window.addEventListener('message', getFormQuestionChangedHandler(embedId, options.onQuestionChanged))
  window.addEventListener('message', getFormSubmitHandler(embedId, options.onSubmit))

  if (type !== 'widget') {
    window.addEventListener('message', dispatchCustomKeyEventFromIframe)
  }

  if (options.shareGaInstance) {
    window.addEventListener(
      'message',
      getFormReadyHandler(embedId, () => {
        setupGaInstance(iframe, embedId)
      })
    )
  }

  return { iframe, embedId }
}

type CreateIframeOptions = UrlOptions & ActionableOptions
