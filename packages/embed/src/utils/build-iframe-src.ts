import { EmbedType, UrlOptions } from '../base'

import { objectToQueryString } from './object-to-query-string'

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
})

export const buildIframeSrc = (formId: string, type: EmbedType, options: UrlOptions): string => {
  const queryParams = mapOptionsToQueryParams(type, options)
  const queryString = objectToQueryString(queryParams)
  return `https://form.typeform.com/to/${formId}?${queryString}`
}
