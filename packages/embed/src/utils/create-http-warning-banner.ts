export const getIsWarningNeeded = () => {
  const href = window.location?.href
  const isSecure = href.startsWith('https://')
  const isIframeSrc = href === 'about:srcdoc'
  const isLocalhost = !!href.match(/^[a-z]+:\/\/localhost($|\/|:|\?)/)
  return !isSecure && !isIframeSrc && !isLocalhost
}

export const createHttpWarningBanner = () => {
  const isWarningNeeded = getIsWarningNeeded()
  if (isWarningNeeded) {
    showConsoleWarning()
  }

  const result = isWarningNeeded ? createBannerElement() : createFakeBannerElement()

  return result
}

const createBannerElement = () => {
  const el = document.createElement('div')
  el.className = 'http-warning-banner'
  el.innerText = getWarningMessage()

  return el
}

const createFakeBannerElement = () => document.createElement('div')

const showConsoleWarning = () => {
  if (getIsWarningNeeded()) {
    // eslint-disable-next-line no-console
    console.error(getWarningMessage())
  }
}

const getWarningMessage = () =>
  `ERROR: Typeform forms can be embedded only on sites served over HTTPS, while this site is using HTTP.`
