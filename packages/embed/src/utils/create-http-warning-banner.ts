export const createHttpWarningBanner = () => {
  const url = new URL(window.location?.href)
  const isWarningNeeded = url.protocol !== 'https' && url.hostname !== 'localhost'

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
  const url = new URL(window.location?.href)
  if (url.protocol !== 'https' && url.hostname !== 'localhost') {
    // eslint-disable-next-line no-console
    console.error(getWarningMessage())
  }
}

const getWarningMessage = () =>
  `ERROR: Typeform forms can be embedded only on sites served over HTTPS, while this site is using HTTP.`
