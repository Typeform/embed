import {
  appendParamsToUrl,
  setMobileMetaViewport,
  replaceExistingKeys,
  redirectToUrl,
  noop,
  getSubmitEventData
} from './utils'
import onMessage from './utils/message-propagation'

const defaultOptions = {
  mode: 'embed-fullpage',
  disableTracking: false,
  onSubmit: noop
}

const queryStringKeys = {
  mode: 'typeform-embed',
  disableTracking: 'disable-tracking'
}

export default function makeFullScreen (iframe, url, options) {
  options = {
    ...defaultOptions,
    ...options
  }

  iframe.src = appendParamsToUrl(url, replaceExistingKeys(options, queryStringKeys))
  iframe.focus()

  const onFormSubmit = (event) => {
    options.onSubmit(getSubmitEventData(event))
  }

  setMobileMetaViewport()

  iframe.onload = () => {
    iframe.contentWindow.focus()
  }

  window.addEventListener('message', onMessage)
  window.addEventListener('form-submit', onFormSubmit)
  window.addEventListener('redirect-after-submit', redirectToUrl)
  window.addEventListener('thank-you-screen-redirect', redirectToUrl)
}
