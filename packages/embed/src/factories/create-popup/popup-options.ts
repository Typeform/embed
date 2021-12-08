import {
  ActionableOptions,
  BaseOptions,
  UrlOptions,
  BehavioralOptions,
  SizeableOptions,
  IframeOptions,
  ModalWindowOptions,
} from '../../base'

export type PopupOptions = BaseOptions &
  ModalWindowOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions &
  IframeOptions & {
    /**
     * Specify the size of the popup (only applies if using mode "popup").
     *
     * @type {number}
     */
    size?: number
  }
