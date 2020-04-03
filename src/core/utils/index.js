import UrlParse from 'url-parse'

import {
  isMobile,
  isSafari,
  isIOSDevice
} from './mobile-detection'
import onMessage from './message-propagation'

export const checkEmbedId = (embedId, event) => event.detail && event.detail.embedId === embedId

export const callIfEmbedIdMatches = (func, embedId) => event => {
  if (checkEmbedId(embedId, event)) {
    func(event)
  }
}

export const broadcastMessage = (embedId, event) => {
  if (event.data.embedId === embedId) {
    onMessage(event)
  }
}

export const updateQueryStringParameter = (key, value, uri) => {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i')
  const separator = uri.indexOf('?') !== -1 ? '&' : '?'
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`)
  }

  return `${uri + separator + key}=${value}`
}

export const appendParamsToUrl = (url, params) => {
  const queryParameters = []
  const {
    query,
    origin,
    pathname
  } = UrlParse(url, true)
  const path = pathname.replace(/\/$/, '') // remove trailing slash
  const parameters = Object.assign({}, query, params)

  Object.keys(parameters).forEach(key => {
    queryParameters.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`
    )
  })

  return `${origin}${path}?${queryParameters.join('&')}`
}

export const replaceExistingKeys = (obj, replacer) => {
  return Object.keys(replacer).reduce((acc, oldKey) => {
    const newKey = replacer[oldKey]
    if (newKey != null && obj[oldKey] != null && obj[oldKey] !== false) {
      acc[newKey] = obj[oldKey]
    }

    return acc
  }, {})
}

export const ensureMetaViewport = () => {
  if (!document.querySelector) {
    return
  }

  const viewport = document.querySelector('meta[name=viewport]')
  const viewportContent =
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'

  if (viewport) {
    viewport.setAttribute('content', viewportContent)
  } else {
    const metaTag = document.createElement('meta')
    metaTag.content = viewportContent
    metaTag.name = 'viewport'
    document.head.appendChild(metaTag)
  }
}

export const isElementInViewport = el => {
  // If it's a nested iframe, don't try to calculate if is insideViewport
  if (window.top !== window) {
    return false
  }

  const rect = el.getBoundingClientRect()

  const margin = rect.height * 0.2 // 20% of margin
  const docWidth = window.innerWidth || document.documentElement.clientWidth
  const docHeight = window.innerHeight || document.documentElement.clientHeight

  return (rect.top >= -margin &&
    rect.left >= -margin &&
    rect.bottom <= docHeight + margin &&
    rect.right <= docWidth + margin
  )
}

// RD-712
export const fixSafariScroll = iframe => {
  if (isMobile(navigator.userAgent) || !isSafari(navigator.userAgent)) {
    return
  }

  iframe.addEventListener('load', () => {
    return setTimeout(() => {
      const originalHeight = window.getComputedStyle(iframe).height
      iframe.setAttribute('height', `${iframe.offsetHeight + 1}px`)
      return setTimeout(() => {
        iframe.setAttribute('height', originalHeight)
      }, 1)
    }, 1000)
  })
}

export const debounce = (func, wait, context) => {
  let timeout
  return (...args) => {
    const debounced = () => {
      timeout = null
      func.call(context, ...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(debounced, wait)
  }
}

// Fix RD-731, footer not fully visible on iOS devices
export const applyIOSFooterHack = element => {
  if (!isIOSDevice(navigator.userAgent)) {
    return
  }

  element.setAttribute('scrolling', 'no')
  element.style.height = '1px'
  element.style.minHeight = '100%'
}

export const applyIOSIframeResizeHack = element => {
  if (!isIOSDevice(navigator.userAgent)) {
    return
  }

  element.style.maxHeight = '100%'
  element.style.maxWidth = '100%'
  element.style.minHeight = '100%'
  element.style.minWidth = '100%'
  element.style.width = 0
}

export const noop = () => null

export const omit = (key, object) => {
  const {
    [key]: deletedKey, ...otherKeys
  } = object
  return otherKeys
}

export const redirectToUrl = event => {
  const { url } = event.detail

  try {
    const anchor = document.createElement('a')

    anchor.href = url

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  } catch (e) {}
}
