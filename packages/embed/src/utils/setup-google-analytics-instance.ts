declare global {
  interface Window {
    GoogleAnalyticsObject: string
  }
}

interface GoogleAnalyticsObject {
  getAll: () => GoogleAnalyticsTracker[]
}

interface GoogleAnalyticsTracker {
  get: (value: string) => string
}

const GA_TYPE_MESSAGE = 'ga-client-id'

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

export const setupGaInstance = (iframe: HTMLIFrameElement, embedId: string, shareGaInstance?: string | boolean) => {
  try {
    const gaObject: GoogleAnalyticsObject = window[window.GoogleAnalyticsObject]
    const trackingId = typeof shareGaInstance === 'string' ? shareGaInstance : undefined
    const tracker = getTracker(gaObject.getAll(), trackingId)

    if (tracker) {
      sendGaIdMessage(embedId, tracker.get('clientId'), iframe)
    } else {
      logError(
        `Whoops! You enabled the shareGaInstance feature in your typeform embed but the tracker with ID ${trackingId} was not found. ` +
          'Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript code in your page and use correct tracker ID. '
      )
    }
  } catch (exception) {
    logError(
      'Whoops! You enabled the shareGaInstance feature in your typeform embed but the Google Analytics object has not been found. ' +
        'Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript code in your page. '
    )
    logError(exception)
  }
}
