import { ActionableOptions, UrlOptions } from '../../base'

export type WidgetOptions = UrlOptions &
  ActionableOptions & {
    buttonText?: string
    container?: HTMLElement
  }
