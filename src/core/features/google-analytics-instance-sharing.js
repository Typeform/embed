export const setupGoogleAnalyticsInstanceSharingFeature = (embedId) => {
  // Throw an error if the feature is enabled but ga is not found

  const gaObject = window[window.GoogleAnalyticsObject]

  if (gaObject === undefined || gaObject === null) {
    throw new Error(
      `Whoops! You enabled the shareGoogleAnalyticsInstance feature but the google analytics object has not been found. 
      Make sure to include Google Analytics Javascript code before the Typeform Embed Javascript code in your page. `
    )
  }

  gaObject(function (tracker) {
    const gaClientId = tracker.get('clientId')
    const data = { embedId, gaClientId }
    const iframeWindow = document.querySelector(`iframe#${embedId}`).contentWindow
    iframeWindow.postMessage({ type: 'ga-client-id', data }, '*')
  })
}
