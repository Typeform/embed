import { EmbedType, UrlOptions } from '../base'

const typesToEmbed: Record<EmbedType, string> = {
  widget: 'embed-widget', // TODO: when widget is full page use 'embed-fullpage'
  popup: 'popup-blank',
  slider: 'popup-drawer',
  popover: 'popup-popover',
  'side-tab': 'popup-side-panel',
}

const mapOptionsToQueryParams = (type: EmbedType, options: UrlOptions): Record<string, any> => ({
  'typeform-embed': typesToEmbed[type],
  'typeform-source': options.source,
  'typeform-medium': options.medium,
  'typeform-medium-version': options.mediumVersion,
  'embed-hide-footer': options.hideFooter ? 'true' : undefined,
  'embed-hide-headers': options.hideHeaders ? 'true' : undefined,
  'embed-opacity': options.opacity,
  'disable-tracking': options.disableTracking ? 'true' : undefined,
})

export const buildIframeSrc = (params: BuildIframeSrcOptions): string => {
  const { formId, type, embedId, options } = params

  const url = new URL(`https://form.typeform.com/to/${formId}`)

  if (embedId) {
    url.searchParams.set('typeform-embed-id', embedId)
  }

  const queryParams = mapOptionsToQueryParams(type, options)
  Object.entries(queryParams).forEach(([paramName, paramValue]) => {
    if (!paramValue) {
      return
    }
    url.searchParams.set(paramName, paramValue)
  })

  return url.href
}

type BuildIframeSrcOptions = {
  formId: string
  embedId: string
  type: EmbedType
  options: UrlOptions
}
