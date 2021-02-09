import { ActionableOptions, UrlOptions } from '../../base'

export type WidgetOptions = UrlOptions &
  ActionableOptions & {
    container?: HTMLElement
  }
