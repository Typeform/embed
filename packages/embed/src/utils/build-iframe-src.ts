import { EmbedType, UrlOptions } from '../base'

export const buildIframeSrc = (formId: string, _type: EmbedType, _options: UrlOptions) => {
  return `https://form.typeform.com/to/${formId}`
}
