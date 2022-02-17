export type UrlOptions = {
  /**
   * Domain name of the site using the SDK.
   *
   * @type {string}
   */
  source?: string
  /**
   * Name of the plugin built on top of the SDK.
   *
   * @type {string}
   */
  medium?: string
  /**
   * Version of the plugin built on top of the SDK.
   *
   * @type {string}
   */
  mediumVersion?: string
  /**
   * Parameters that we want to transfert from the URL to the Typeform as hidden fields.
   *
   * @type {string[]}
   */
  transitiveSearchParams?: string[]
  /**
   * Hide typeform footer, that appears showing the progress bar and the navigation buttons.
   *
   * @type {boolean}
   */
  hideFooter?: boolean
  /**
   * Hide typeform header, that appears when you have a Question group, or a long question that you need to scroll through to answer, like a Multiple Choice block.
   *
   * @type {boolean}
   */
  hideHeaders?: boolean
  /**
   * You can make your typeform's background totally transparent, or opaque. (For example, to have a video as a background).
   *
   * @type {number}
   */
  opacity?: number
  /**
   * Disables tracking.
   *
   * @type {boolean}
   */
  disableTracking?: boolean
  /**
   * Allows to share the Google instance of the page with the Typeform in the embed.
   * If string value is provided it specifies which Google Analytics instance to share (in case there are more in the host page).
   *
   * @type {string | boolean}
   */
  shareGaInstance?: string | boolean
  /**
   * Disables form auto focusing.
   *
   * @type {boolean}
   */
  disableAutoFocus?: boolean
  /**
   * Enable sandbox mode for the form.
   * Allow testing without adding an entry to results or affecting metrics.
   *
   * @type {boolean}
   */
  enableSandbox?: boolean
  /**
   * Forces mobile for the form
   *
   * @type {boolean}
   */
  forceTouch?: boolean
  /**
   * Enables fullscreen iframe
   *
   * @type {boolean}
   */
  enableFullscreen?: boolean
  /**
   * List of tracking query strings
   *
   * @type {Record<string,string>}
   */
  tracking?: Record<string, string>
  /**
   * Redirect target for redirect on submit or redirect from thank you page.
   *
   * Browser Compatibility Note:
   * Target "_blank" will be blocked in some browsers: Safari on dekstop and iOS, Chrome on Android.
   * Redirecting in new tab works in Chrome and Firefox on desktop.
   *
   * @type {'_self' | '_top' | '_blank' | '_parent'}
   */
  redirectTarget?: '_self' | '_top' | '_blank' | '_parent'
}
