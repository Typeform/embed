export const getIsWarningNeeded = () => {
  const url = new URL(window.location?.href)
  return url.protocol !== 'https:' && url.href !== 'about:srcdoc' && url.hostname !== 'localhost'
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
