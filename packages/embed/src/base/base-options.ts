export type BaseOptions = {
  /**
   * List of hidden fields
   *
   * @type {Record<string,string>}
   */
  hidden?: Record<string, string>

  /**
   * Display embedded typeform as conversation
   *
   * @type {boolean}
   */
  chat?: boolean

  /**
   * Reopen the modal window with form in the same state as it wos when closed.
   * For widget this applies only on mobile (without displayOnMobile option).
   */
  keepSession?: boolean
}
