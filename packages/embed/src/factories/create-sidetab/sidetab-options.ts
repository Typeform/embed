import { ActionableOptions, BaseOptions, UrlOptions, BehavioralOptions, SizeableOptions } from '../../base'

export type SidetabOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions & {
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
    /**
     * Specify the image url for the sidetab trigger button icon
     *
     * @type {string}
     */
    customIcon?: string
    /**
     * Time (ms) until the embedded typeform will automatically close after a respondent clicks the Submit button.
     *
     * @type {number}
     */
    autoClose?: number
  }
