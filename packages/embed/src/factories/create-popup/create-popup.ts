import { Embed, EmbedOptions, EmbedType } from '../../base'
import { createEmbed } from '../create-embed'

export const createPopup = (formId: string, options: EmbedOptions = {}): Embed =>
  createEmbed(formId, EmbedType.Popup, options)
