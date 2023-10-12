import {
  ActionableOptions,
  BaseOptions,
  UrlOptions,
  BehavioralOptions,
  SizeableOptions,
  IframeOptions,
  ModalWindowOptions,
  ButtonOptions,
} from '../../base'

export type SidetabOptions = BaseOptions &
  ModalWindowOptions &
  UrlOptions &
  ActionableOptions &
  BehavioralOptions &
  SizeableOptions &
  IframeOptions &
  ButtonOptions & {
    buttonText?: string
    buttonColor?: string
    buttonTextColor?: string
    buttonTextSize?: number | string
    buttonWidth?: number | string
    buttonHeight?: number | string
    buttonAlign?: 'top' | 'center' | 'bottom'
    top?: number | string
    bottom?: number | string
    customIcon?: string
  }
