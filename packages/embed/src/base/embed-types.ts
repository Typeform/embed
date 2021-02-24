import { ActionableOptions } from './actionable-options'
import { UrlOptions } from './url-options'

export enum EmbedType {
  Popover = 'popover',
  Popup = 'popup',
  SideTab = 'side-tab',
  Slider = 'slider',
  Widget = 'widget',
}

export type EmbedRefreshable = {
  refresh: () => void
}

export type Embed = EmbedRefreshable & {
  close: () => void
  open: () => void
  toggle: () => void
}

export type ToggleHandlers = 'onclick'
export type EmbedProperties = {
  closeable: boolean
  toggleHandlers?: ToggleHandlers[]
}

export type EmbedOptions = UrlOptions &
  ActionableOptions & {
    container?: HTMLElement
    closeElements?: HTMLElement[]
    element?: HTMLElement
  }

export const EmbedBlueprint: { [key in EmbedType]: EmbedProperties } = {
  [EmbedType.Popover]: {
    closeable: false,
    toggleHandlers: ['onclick'],
  },
  [EmbedType.Popup]: {
    closeable: true,
    toggleHandlers: ['onclick'],
  },
  [EmbedType.SideTab]: {
    closeable: true,
    toggleHandlers: ['onclick'],
  },
  [EmbedType.Slider]: {
    closeable: false,
    toggleHandlers: ['onclick'],
  },
  [EmbedType.Widget]: {
    closeable: false,
  },
}
