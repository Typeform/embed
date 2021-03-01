import { ActionableOptions, UrlOptions, BehavioralOptions } from '../../base'

export type SidetabOptions = UrlOptions &
  ActionableOptions &
  BehavioralOptions & {
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
