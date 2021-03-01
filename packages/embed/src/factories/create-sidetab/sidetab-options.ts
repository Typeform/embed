import { ActionableOptions, UrlOptions, BehavioralOptions } from '../../base'

export type SidetabOptions = UrlOptions &
  ActionableOptions &
  BehavioralOptions & {
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
     * Element to place the popup into. Optional. Required only for "side_panel" mode.
     *
     * @type {HTMLElement}
     */
    container?: HTMLElement
    /**
     * Specify the button text
     *
     * @type {string}
     */
    buttonText?: string
    /**
     * Specify the button background color
     *
     * @type {string}
     */
    buttonColor?: string
  }
