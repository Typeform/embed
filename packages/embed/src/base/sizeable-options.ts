export type WidthOption = {
  /**
   * Specify the width of the embed.
   *
   * @type {number}
   */
  width?: number
}

export type SizeableOptions = WidthOption & {
  /**
   * Specify the height of the embed.
   *
   * @type {number}
   */
  height?: number
  /**
   * Automatically resize embed to always fit the whole form.
   *
   * @type {boolean | string}
   */
  autoResize?: boolean | string
  /**
   * Make the widget embed full screen, resize on viewport change to fit window
   */
  fullScreen?: boolean
}
