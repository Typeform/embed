import CustomEvent from 'custom-event'
import isObject from 'isobject'
import isUrl from 'is-url'

const DOMAIN_REGEXP = /(\.typeform)\.(com|io)$/

const acceptMessageOrigin = event => {
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  // deal with polymorphistic legacy: some events come from jQuery, other Vanilla JS
  const re = new RegExp('^(?:f|ht)tp(?:s)?://([^/]+)', 'im')
  const matches = event.origin.match(re)
  if (matches && matches.length > 1) {
    const domain = matches[1].toString()

    // to test this in local you will need to whitelist your local domain
    if (!DOMAIN_REGEXP.test(domain)) {
      return false
    }
  } else {
    return false
  }

  return true
}

export default event => {
  event = event.originalEvent || event
  if (!acceptMessageOrigin(event)) {
    return
  }

  if (isUrl(event.data)) {
    window.location.href = event.data
    return
  }

  if (isObject(event.data) && event.data.hasOwnProperty('type')) {
    window.dispatchEvent(new CustomEvent(event.data.type, {
      detail: event.data
    }))
    return
  }

  window.dispatchEvent(new CustomEvent(event.data))
}
