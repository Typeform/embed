import { EmbedType, UrlOptions, ActionableOptions, IframeOptions } from '../../base'
import { buildIframeSrc } from '../build-iframe-src'
import { setupGaInstance } from '../'

import { generateEmbedId } from './generate-embed-id'
import {
  getFormReadyHandler,
  getFormQuestionChangedHandler,
  getFormSubmitHandler,
  getFormHeightChangedHandler,
  getFormThemeHandler,
  getThankYouScreenButtonClickHandler,
} from './get-form-event-handler'
import { triggerIframeRedraw } from './trigger-iframe-redraw'
import { dispatchCustomKeyEventFromIframe } from './setup-custom-keyboard-close'
import { refreshIframe } from './refresh-iframe'

type CreateIframe = {
  formId: string
  domain?: string
  options: CreateIframeOptions
}

type CreateIframeOptions = UrlOptions & ActionableOptions & IframeOptions

export const createIframe = (type: EmbedType, { formId, domain, options }: CreateIframe) => {
  const embedId = generateEmbedId()
  const {
    iframeProps = {},
    onReady,
    onQuestionChanged,
    onHeightChanged,
    onSubmit,
    onEndingButtonClick,
    shareGaInstance,
  } = options

  const src = buildIframeSrc({ formId, domain, embedId, type, options })

  const iframe = document.createElement('iframe')
  iframe.src = src
  iframe.dataset.testid = 'iframe'
  iframe.style.border = '0px'
  iframe.allow = 'microphone; camera'

  Object.keys(iframeProps).forEach((key) => {
    iframe.setAttribute(key, iframeProps[key])
  })

  iframe.addEventListener('load', triggerIframeRedraw, { once: true })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onTheme = (data: any) => {
    if (data?.theme) {
      const closeButtonElement = document.querySelector('.tf-v1-close-icon') as HTMLElement
      if (closeButtonElement) {
        closeButtonElement.style.color = data.theme?.color
      }
    }
  }

  window.addEventListener('message', getFormReadyHandler(embedId, onReady))
  window.addEventListener('message', getFormQuestionChangedHandler(embedId, onQuestionChanged))
  window.addEventListener('message', getFormHeightChangedHandler(embedId, onHeightChanged))
  window.addEventListener('message', getFormSubmitHandler(embedId, onSubmit))
  window.addEventListener('message', getFormThemeHandler(embedId, onTheme))
  window.addEventListener('message', getThankYouScreenButtonClickHandler(embedId, onEndingButtonClick))

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

  const refresh = () => refreshIframe(iframe)

  const focus = () => {
    iframe.contentWindow?.postMessage('embed-focus', '*')
  }

  return { iframe, embedId, refresh, focus }
}
