import { EmbedType, UrlOptions, ActionableOptions, IframeOptions } from '../../base'
import { buildIframeSrc } from '../build-iframe-src'
import { setupGaInstance } from '../'

import { generateEmbedId } from './generate-embed-id'
import { getFormReadyHandler, getFormQuestionChangedHandler, getFormSubmitHandler } from './get-form-event-handler'
import { triggerIframeRedraw } from './trigger-iframe-redraw'
import { dispatchCustomKeyEventFromIframe } from './setup-custom-keyboard-close'

export const createIframe = (formId: string, type: EmbedType, options: CreateIframeOptions) => {
  const embedId = generateEmbedId()
  const { iframeProps = {}, onReady, onQuestionChanged, onSubmit, shareGaInstance } = options
  const src = buildIframeSrc({ formId, embedId, type, options })

  const iframe = document.createElement('iframe')
  iframe.src = src
  iframe.dataset.testid = 'iframe'
  iframe.style.border = '0px'

  Object.keys(iframeProps).forEach((key) => {
    iframe.setAttribute(key, iframeProps[key])
  })

  iframe.addEventListener('load', triggerIframeRedraw, { once: true })

  window.addEventListener('message', getFormReadyHandler(embedId, onReady))
  window.addEventListener('message', getFormQuestionChangedHandler(embedId, onQuestionChanged))
  window.addEventListener('message', getFormSubmitHandler(embedId, onSubmit))

  if (type !== 'widget') {
    window.addEventListener('message', dispatchCustomKeyEventFromIframe)
  }

  if (shareGaInstance) {
    window.addEventListener(
      'message',
      getFormReadyHandler(embedId, () => {
        setupGaInstance(iframe, embedId, shareGaInstance)
      })
    )
  }

  return { iframe, embedId }
}

type CreateIframeOptions = UrlOptions & ActionableOptions & IframeOptions
