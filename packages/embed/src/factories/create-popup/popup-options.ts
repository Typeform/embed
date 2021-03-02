import { ActionableOptions, UrlOptions, BehavioralOptions } from '../../base'

export type PopupOptions = UrlOptions &
  ActionableOptions &
  BehavioralOptions & {
    /**
     * Time until the embedded typeform will automatically close after a respondent clicks the Submit button. The default time is 5 seconds. PRO+ users can change the autoClose time.
     *
     * @type {number}
     */
    autoClose?: number
    /**
     * Hide fixed scrollbars.
     *
     * @type {boolean}
     */
    hideScrollbars?: boolean
    /**
     * Specify the width of the drawer or popup (only applies if using mode "drawer_left" or "drawer_right" or "popover" or "side_panel").
     *
     * @type {number}
     */
    width?: number
    /**
     * Specify the height of the popup (only applies if using mode "popover" or "side_panel").
     *
     * @type {number}
     */
    height?: number
    /**
     * Specify the size of the popup (only applies if using mode "popup").
     *
     * @type {number}
     */
    size?: number
    /**
     * Element to place the popup into. Optional. Required only for "side_panel" mode.
     *
     * @type {HTMLElement}
     */
    container?: HTMLElement
    /**
     * Specify custom launch options for Popup
     *
     * @type {string}
     */
    open?: 'exit' | 'load' | 'scroll' | 'time'
    /**
     * Specify threshold for trigger custom launch option
     *
     * @type {string}
     */
    openValue?: number
  }
