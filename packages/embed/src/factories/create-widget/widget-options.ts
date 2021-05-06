import { ActionableOptions, BaseOptions, UrlOptions } from '../../base'

export type WidgetOptions = BaseOptions &
  UrlOptions &
  ActionableOptions & {
    /**
     * Element to place the widget into.
     *
     * @type {HTMLElement}
     */
    container: HTMLElement
    /**
     * Specify the width of the widget
     *
     * @type {number}
     */
    width?: number
    /**
     * Specify the height of the widget
     *
     * @type {number}
     */
    height?: number
  }
