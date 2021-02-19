import { EmbedType, UrlOptions } from '../base'

export const buildIframeSrc = (options: BuildIframeSrcOptions) => {
  const { formId, embedId } = options

  const url = new URL(`https://form.typeform.com/to/${formId}`)
  url.searchParams.set('typeform-embed-id', embedId)

  return url.href
}

type BuildIframeSrcOptions = {
  formId: string
  embedId: string
  type: EmbedType
  options: UrlOptions
}
