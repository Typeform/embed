import { ActionableOptions, BaseOptions, UrlOptions, SizeableOptions, IframeOptions } from '../../base'

export type WidgetOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  SizeableOptions &
  IframeOptions & {
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
