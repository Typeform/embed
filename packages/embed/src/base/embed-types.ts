export type EmbedType = 'widget' | 'popup' | 'slider' | 'popover' | 'side-tab'

export type EmbedWidget = {
  unmount: () => void
  refresh: () => void
  focus: () => void
}

export type EmbedPopup = EmbedWidget & {
  open: () => void
  close: () => void
  toggle: () => void
}
