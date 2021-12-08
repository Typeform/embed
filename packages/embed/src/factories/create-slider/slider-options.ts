import {
  ActionableOptions,
  BaseOptions,
  UrlOptions,
  BehavioralOptions,
  WidthOption,
  IframeOptions,
  ModalWindowOptions,
} from '../../base'

export type SliderOptions = BaseOptions &
  ModalWindowOptions &
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
  }
