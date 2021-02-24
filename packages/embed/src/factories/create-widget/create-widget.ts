import { EmbedOptions, EmbedRefreshable, EmbedType } from '../../base'
import { createEmbed } from '../create-embed'

export const createWidget = (formId: string, options: EmbedOptions = {}): EmbedRefreshable =>
  createEmbed(formId, EmbedType.Widget, options)
