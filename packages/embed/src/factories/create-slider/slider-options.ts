import { ActionableOptions, UrlOptions, BehavioralOptions } from '../../base'

export type SliderOptions = UrlOptions &
  ActionableOptions &
  BehavioralOptions & {
    /**
     * Slider position. Indicates from which side of the screen it will open.
     *
     * @type 'right' | 'left'
     */
    position?: 'right' | 'left'
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
     * Element to place the popup into. Optional. Required only for "side_panel" mode.
     *
     * @type {HTMLElement}
     */
    container?: HTMLElement
  }
