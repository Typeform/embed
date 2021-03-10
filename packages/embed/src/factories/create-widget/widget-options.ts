import { ActionableOptions, BaseOptions, UrlOptions } from '../../base'

export type WidgetOptions = BaseOptions &
  UrlOptions &
  ActionableOptions & {
    container: HTMLElement
  }
