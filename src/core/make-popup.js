import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import {
  appendParamsToUrl,
  replaceExistingKeys,
  ensureMetaViewport,
  noop
} from './utils'
import randomString from './utils/random-string'
import {
  isMobile,
  isScreenBig
} from './utils/mobile-detection'
import Popup, {
  POPUP,
  POPUP_MODES,
  DEFAULT_AUTOCLOSE_TIMEOUT
} from './views/popup'
import MobileModal from './views/mobile-modal'
import { getPostMessageHandler } from './utils/get-post-message-handler'
import { handleAutoOpen } from './utils/popup-auto-open'

const DEFAULT_DRAWER_WIDTH = 800

const defaultOptions = {
  mode: POPUP,
  isModalOpen: false,
  autoClose: DEFAULT_AUTOCLOSE_TIMEOUT,
  hideFooter: false,
  hideHeaders: false,
  hideScrollbars: false,
  disableTracking: false,
  drawerWidth: DEFAULT_DRAWER_WIDTH,
  onSubmit: noop,
  open: null,
  openValue: null
}

const queryStringKeys = {
  embedType: 'typeform-embed',
  hideFooter: 'embed-hide-footer',
  hideHeaders: 'embed-hide-headers',
  disableTracking: 'disable-tracking'
}

const renderComponent = (params, options) => {
  const { url, domNode, close } = params
  const {
    autoClose,
    buttonText,
    embedId,
    isAutoCloseEnabled,
    onSubmit
  } = options

  const urlWithQueryString = appendParamsToUrl(
    url,
    replaceExistingKeys(options, queryStringKeys)
  )

  if (!isMobile(navigator.userAgent) && isScreenBig()) {
    render(
      <Popup
        embedId={embedId}
        onClose={close}
        options={options}
        url={urlWithQueryString}
      />,
      domNode
    )
  } else {
    ensureMetaViewport()
    render(
      <MobileModal
        autoClose={autoClose}
        buttonText={buttonText}
        embedId={embedId}
        isAutoCloseEnabled={isAutoCloseEnabled}
        onClose={close}
        onSubmit={onSubmit}
        open
        url={urlWithQueryString}
      />,
      domNode
    )
  }
}

export default function makePopup (url, options) {
  window.addEventListener('message', getPostMessageHandler('form-ready', options.onReady))
  window.addEventListener('message', getPostMessageHandler('form-closed', options.onClose))

  const embedId = randomString()

  options = {
    ...defaultOptions,
    ...options,
    isAutoCloseEnabled: options.autoClose !== undefined,
    embedType: POPUP_MODES[options.mode],
    embedId
  }

  if (!Number.isSafeInteger(options.drawerWidth)) {
    throw new Error(
      `Whoops! You provided an invalid 'drawerWidth' option: "${options.drawerWidth}". It must be a number.`
    )
  }

  const domNode = document.createElement('div')
  options.isContained = options.container !== undefined
  options.container = options.container || document.body
  options.container.appendChild(domNode)

  const popup = {
    open (event) {
      const { currentTarget } = event || {}
      const currentUrl = currentTarget && currentTarget.href ? currentTarget.href : url
      const params = {
        domNode,
        url: currentUrl,
        close: this.close
      }

      renderComponent(params, options)
    },
    close () {
      window.postMessage({ type: 'form-closed', embedId }, '*')

      unmountComponentAtNode(domNode)
    }
  }

  if (!options.open && options.autoOpen) { // legacy auto-open attribute
    options.open = 'load'
  }

  handleAutoOpen(popup, options.open, options.openValue)

  return popup
}
