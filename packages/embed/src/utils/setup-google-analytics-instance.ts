declare global {
  interface Window {
    ga: GoogleAnalyticsObject
    gtag: Function
  }
}

interface GoogleAnalyticsObject {
  getAll: () => GoogleAnalyticsTracker[]
}

interface GoogleAnalyticsTracker {
  get: (value: string) => string
}

const GA_TYPE_MESSAGE = 'ga-client-id'
const G4A_CALLBACK_TIMEOUT = 3000

export const sendGaIdMessage = (embedId: string, gaClientId: string, iframe: HTMLIFrameElement) => {
  const data = { embedId, gaClientId }
  setTimeout(() => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: GA_TYPE_MESSAGE, data }, '*')
    }
  }, 0)
}

const getTracker = (trackers: GoogleAnalyticsTracker[], trackingId?: string) => {
  if (trackingId) {
    return trackers.find((tracker) => tracker.get('trackingId') === trackingId)
  }
  return trackers[0]
}

const logError = (message: string) => {
  // eslint-disable-next-line no-console
  console.error(message)
}

const getTrackingFromDataLayer = (): string | undefined => {
  if (window['dataLayer']) {
    const config = window['dataLayer'].find((entry: string[]) => {
      return entry.length > 1 && entry[0] === 'config'
    })
    return config && config[1]
  }
}

const logErrorMessage = (reason?: string) => {
  logError(
    `Whoops! You enabled the shareGaInstance feature in your typeform embed but ${reason}.\n\n` +
      'Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript ' +
      'code in your page and use correct tracker ID.\n\n' +
      'It is also possible the Google Analytics was blocked by your adblock plugin.'
  )
}

export const setupGaInstance = (iframe: HTMLIFrameElement, embedId: string, shareGaInstance?: string | boolean) => {
  let trackingId = typeof shareGaInstance === 'string' ? shareGaInstance : undefined
  if (window.gtag) {
    if (!trackingId) {
      trackingId = getTrackingFromDataLayer()
    }
    if (!trackingId) {
      logErrorMessage('the tracking ID could not be retrieved')
      return
    }
    let fetchedAccountId = false
    window.gtag('get', trackingId, 'client_id', (clientId: string) => {
      fetchedAccountId = true
      sendGaIdMessage(embedId, clientId, iframe)
    })
    setTimeout(() => {
      if (!fetchedAccountId) {
        logErrorMessage(`the tracker with ID ${trackingId} was not found`)
      }
    }, G4A_CALLBACK_TIMEOUT)
  } else {
    try {
      const gaObject: GoogleAnalyticsObject = window.ga
      const tracker = getTracker(gaObject.getAll(), trackingId)

      if (tracker) {
        sendGaIdMessage(embedId, tracker.get('clientId'), iframe)
      } else {
        logErrorMessage(`the tracker with ID ${trackingId} was not found`)
      }
    } catch (exception) {
      logErrorMessage('the Google Analytics object was not found')
      logError(exception as string)
    }
  }
}
