import { ActionableOptions, BaseOptions, UrlOptions, BehavioralOptions, SizeableOptions } from '../../base'

export type PopupOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions & {
    /**
     * Time (ms) until the embedded typeform will automatically close after a respondent clicks the Submit button.
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
