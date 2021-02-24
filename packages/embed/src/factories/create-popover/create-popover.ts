import { Embed, EmbedOptions, EmbedType } from '../../base'
import { createEmbed } from '../create-embed'

export const createPopover = (formId: string, options: EmbedOptions = {}): Embed =>
  createEmbed(formId, EmbedType.Popover, options)
