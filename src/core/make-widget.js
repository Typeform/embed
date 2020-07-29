import React from 'react'
import { render } from 'react-dom'

import {
  appendParamsToUrl,
  replaceExistingKeys,
  noop,
  omit
} from './utils'
import {
  transferUrlParametersToQueryStrings
} from './utils/url-parameters-transfer'
import {
  isMobile
} from './utils/mobile-detection'
import Widget from './views/widget'
import { getPostMessageHandler } from './utils/get-post-message-handler'

const defaultOptions = {
  mode: 'embed-widget',
  hideFooter: false,
  hideHeaders: false,
  hideScrollbars: false,
  disableTracking: false,
  transferableUrlParameters: [],
  onSubmit: noop
}

const queryStringKeys = {
  mode: 'typeform-embed',
  hideFooter: 'embed-hide-footer',
  hideHeaders: 'embed-hide-headers',
  opacity: 'embed-opacity',
  disableTracking: 'disable-tracking'
}

export default function makeWidget (element, url, options) {
  options = { ...defaultOptions, ...options }

  window.addEventListener('message', getPostMessageHandler('form-ready', options.onReady))

  const enabledFullscreen = isMobile(navigator.userAgent)

  let queryStrings = replaceExistingKeys(options, queryStringKeys)
  queryStrings = transferUrlParametersToQueryStrings(options.transferableUrlParameters, queryStrings)

  if (enabledFullscreen) {
    queryStrings = {
      // We don't set the opacity on the iframe when is mobile
      ...omit('embed-opacity', queryStrings),
      'add-placeholder-ws': true
    }
  }

  const urlWithQueryString = appendParamsToUrl(url, queryStrings)

  render(
    <Widget
      enabledFullscreen={enabledFullscreen}
      options={options}
      url={urlWithQueryString}
    />,
    element
  )
}
