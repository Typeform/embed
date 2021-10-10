import { ActionableOptions, BaseOptions, UrlOptions, BehavioralOptions, WidthOption, IframeOptions } from '../../base'

export type SliderOptions = BaseOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  WidthOption &
  IframeOptions & {
    /**
     * Slider position. Indicates from which side of the screen it will open.
     *
     * @type 'right' | 'left'
     */
    position?: 'right' | 'left'
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
     * Element to place the popup into. Optional. Required only for "side_panel" mode.
     *
     * @type {HTMLElement}
     */
    container?: HTMLElement
  }
