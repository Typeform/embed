import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { appendParamsToUrl, replaceExistingKeys, callIfEmbedIdMatches, noop } from './utils'
import { transferUrlParametersToQueryStrings } from './utils/url-parameters-transfer'
import randomString from './utils/random-string'
import { isMobile, isScreenBig } from './utils/mobile-detection'
import Popup, {
  POPUP,
  POPUP_MODES,
  DEFAULT_AUTOCLOSE_TIMEOUT,
  POPOVER,
  DRAWER,
  DRAWER_RIGHT,
  SIDE_PANEL,
} from './views/popup'
import MobileModal from './views/mobile-modal'
import { getPostMessageHandler } from './utils/get-post-message-handler'
import { handleAutoOpen } from './utils/popup-auto-open'

const DEFAULT_DRAWER_WIDTH = 800
const DEFAULT_POPUP_WIDTH = 320
const DEFAULT_POPUP_HEIGHT = 500
const DEFAULT_POPUP_SIZE_PERCENT = 100

const buildOptions = (embedId, options) => {
  const isDrawer = options.mode === DRAWER || options.mode === DRAWER_RIGHT
  const drawerWidth = options.width || options.drawerWidth || DEFAULT_DRAWER_WIDTH
  const popupWidth = options.width || DEFAULT_POPUP_WIDTH
  const width = isDrawer ? drawerWidth : popupWidth

  return {
    embedId,
    mode: POPUP,
    embedType: POPUP_MODES[options.mode] || POPUP_MODES[POPUP],
    isModalOpen: false,
    autoClose: DEFAULT_AUTOCLOSE_TIMEOUT,
    medium: 'embed-sdk',
    source: window?.location?.hostname.replace('wwww.', ''),
    hideFooter: false,
    hideHeaders: false,
    hideScrollbars: false,
    disableTracking: false,
    transferableUrlParameters: options.transferableUrlParameters || [],
    onSubmit: noop,
    open: null,
    openValue: null,
    width,
    height: DEFAULT_POPUP_HEIGHT,
    isAutoCloseEnabled: options.autoClose !== undefined,
    size: DEFAULT_POPUP_SIZE_PERCENT,
    ...options,
  }
}

const queryStringKeys = {
  embedType: 'typeform-embed',
  source: 'typeform-source',
  medium: 'typeform-medium',
  mediumVersion: 'typeform-medium-version',
  open: 'typeform-embed-trigger-type',
  hideFooter: 'embed-hide-footer',
  hideHeaders: 'embed-hide-headers',
  disableTracking: 'disable-tracking',
}

const renderComponent = (params, options) => {
  const { url, domNode, close, icon } = params
  const { autoClose, buttonText, embedId, isAutoCloseEnabled, onSubmit } = options

  let queryStrings = replaceExistingKeys(options, queryStringKeys)
  queryStrings = transferUrlParametersToQueryStrings(options.transferableUrlParameters, queryStrings)

  const urlWithQueryString = appendParamsToUrl(url, queryStrings)

  if (!isMobile(navigator.userAgent) && isScreenBig()) {
    render(<Popup embedId={embedId} icon={icon} onClose={close} options={options} url={urlWithQueryString} />, domNode)
  } else {
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

export default function makePopup(url, userOptions, element) {
  const embedId = randomString()

  window.addEventListener(
    'message',
    callIfEmbedIdMatches(getPostMessageHandler('form-ready', userOptions.onReady), embedId)
  )
  window.addEventListener(
    'message',
    callIfEmbedIdMatches(getPostMessageHandler('form-closed', userOptions.onClose), embedId)
  )

  const options = buildOptions(embedId, userOptions)

  if (!Number.isSafeInteger(options.width)) {
    throw new Error(`Whoops! You provided an invalid 'width' option: "${options.width}". It must be a number.`)
  }
  if (!Number.isSafeInteger(options.height)) {
    throw new Error(`Whoops! You provided an invalid 'height' option: "${options.height}". It must be a number.`)
  }

  const domNode = document.createElement('div')
  options.isContained = options.container !== undefined
  options.container = options.container || document.body
  options.container.appendChild(domNode)

  const popup = {
    element,
    open(event) {
      const currentTarget = event && event.currentTarget ? event.currentTarget : this.element
      const currentUrl = currentTarget && currentTarget.href ? currentTarget.href : url
      const icon = currentTarget && currentTarget.querySelector('span.icon')
      const params = {
        domNode,
        icon,
        url: currentUrl,
        close: this.close.bind(this),
      }

      const isOpen = domNode.children.length > 0
      const togglePopup = options.mode === POPOVER || options.mode === SIDE_PANEL
      if (isOpen && togglePopup) {
        if (typeof window.tfClosePopup === 'function') {
          window.tfClosePopup({ ...event, detail: { embedId } })
        }
      } else {
        renderComponent(params, options)
      }
    },
    close() {
      window.postMessage({ type: 'form-closed', embedId }, '*')
      unmountComponentAtNode(domNode)
    },
  }

  if (!options.open && options.autoOpen) {
    // legacy auto-open attribute
    options.open = 'load'
  }

  handleAutoOpen(popup, options.open, options.openValue)

  return popup
}
