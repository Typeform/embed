import { ActionableOptions, BaseOptions, UrlOptions, BehavioralOptions, SizeableOptions } from '../../base'

export type PopoverOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions & {
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
     * Specify the size of the popover (only applies if using mode "popover").
     *
     * @type {number}
     */
    size?: number
    /**
     * Specify the color of the popover button
     *
     * @type {string}
     */
    buttonColor?: string
    /**
     * Specify the image url for the popover trigger button icon
     *
     * @type {string}
     */
    customIcon?: string
    /**
     * Element to place the popover into. Optional.
     *
     * @type {HTMLElement}
     */
    container?: HTMLElement
    /**
     * Message to dislay next to the button.
     *
     * @type {string}
     */
    tooltip?: string
  }
