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
}
