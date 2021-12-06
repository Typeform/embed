import {
  ActionableOptions,
  BaseOptions,
  UrlOptions,
  BehavioralOptions,
  SizeableOptions,
  IframeOptions,
  ModalWindowOptions,
} from '../../base'

export type SidetabOptions = BaseOptions &
  ModalWindowOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions &
  IframeOptions & {
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
  }
