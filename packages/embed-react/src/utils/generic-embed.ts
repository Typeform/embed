export type GenericEmbed = {
  unmount: () => void
  open: () => void
}

export const genericEmbed: GenericEmbed = {
  unmount: () => {},
  open: () => {},
}
