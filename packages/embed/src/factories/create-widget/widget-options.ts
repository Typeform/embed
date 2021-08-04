import { ActionableOptions, BaseOptions, UrlOptions, SizeableOptions } from '../../base'

export type WidgetOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  SizeableOptions & {
    /**
     * Element to place the widget into.
     *
     * @type {HTMLElement}
     */
    container: HTMLElement
    /**
     * Overrides fullscreen modal on mobile.
     *
     * @type {boolean}
     */
    inlineOnMobile?: boolean
  }
