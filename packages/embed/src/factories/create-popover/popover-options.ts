import {
  ActionableOptions,
  BaseOptions,
  UrlOptions,
  BehavioralOptions,
  SizeableOptions,
  IframeOptions,
} from '../../base'

export type PopoverOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions &
  IframeOptions & {
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
    /**
     * Unread notification on the chat button
     *
     * @type {number}
     */
    notificationDays?: number
  }
