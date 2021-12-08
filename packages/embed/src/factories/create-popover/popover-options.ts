import {
  ActionableOptions,
  BaseOptions,
  UrlOptions,
  BehavioralOptions,
  SizeableOptions,
  IframeOptions,
  ModalWindowOptions,
} from '../../base'

export type PopoverOptions = BaseOptions &
  ModalWindowOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions &
  IframeOptions & {
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
