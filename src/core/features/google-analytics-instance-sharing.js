const setupGoogleAnalyticsInstanceSharingFeature = (iframeRef, embedId) => {
  // Throw an error if the feature is enabled but ga is not found

  const gaObject = window[window.GoogleAnalyticsObject]

  if (gaObject === undefined || gaObject === null) {
    // eslint-disable-next-line no-console
    console.error(`Whoops! You enabled the shareGoogleAnalyticsInstance feature but the google analytics object has not been found.
      Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript code in your page.`)
  }

  const sendGaIdMessage = (gaClientId) => {
    const data = { embedId, gaClientId }
    setTimeout(() => {
      if (iframeRef && iframeRef.contentWindow) {
        iframeRef.contentWindow.postMessage({ type: 'ga-client-id', data }, '*')
      }
    }, 0)
  }

  gaObject((tracker) => {
    const gaClientId = tracker.get('clientId')
    sendGaIdMessage(gaClientId)
  })
}

export default setupGoogleAnalyticsInstanceSharingFeature
