import { ActionableOptions, UrlOptions, BehavioralOptions } from '../../base'

export type PopoverOptions = UrlOptions &
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
     * Specify the width of the drawer or popover (only applies if using mode "drawer_left" or "drawer_right" or "popover" or "side_panel").
     *
     * @type {number}
     */
    width?: number
    /**
     * Specify the height of the popover (only applies if using mode "popover" or "side_panel").
     *
     * @type {number}
     */
    height?: number
    /**
     * Specify the size of the popover (only applies if using mode "popover").
     *
     * @type {number}
     */
    size?: number
    /**
     * Element to place the popover into. Optional.
     *
     * @type {HTMLElement}
     */
    container?: HTMLElement
    element?: HTMLElement
  }
