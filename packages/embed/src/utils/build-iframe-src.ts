import { EmbedType, UrlOptions } from '../base'

import { removeUndefinedKeys } from './remove-undefined-keys'
import { isDefined } from './is-defined'
import { getTransitiveSearchParams } from './get-transitive-search-params'

const defaultUrlOptions: UrlOptions = {
  source: window?.location?.hostname.replace(/^www\./, ''),
  medium: 'embed-sdk',
}

const addDefaultUrlOptions = (options: UrlOptions): UrlOptions => {
  return { ...defaultUrlOptions, ...removeUndefinedKeys(options) }
}

const typesToEmbed: Record<EmbedType, string> = {
  widget: 'embed-widget', // TODO: when widget is full page use 'embed-fullpage'
  popup: 'popup-blank',
  slider: 'popup-drawer',
  popover: 'popup-popover',
  'side-tab': 'popup-side-panel',
}

const mapOptionsToQueryParams = (type: EmbedType, embedId: string, options: UrlOptions): Record<string, any> => {
  const transitiveParams = getTransitiveSearchParams(options.transitiveSearchParams)
  const params = {
    'typeform-embed-id': embedId,
    'typeform-embed': typesToEmbed[type],
    'typeform-source': options.source,
    'typeform-medium': options.medium,
    'typeform-medium-version': options.mediumVersion,
    'embed-hide-footer': options.hideFooter ? 'true' : undefined,
    'embed-hide-headers': options.hideHeaders ? 'true' : undefined,
    'embed-opacity': options.opacity,
    'disable-tracking': options.disableTracking ? 'true' : undefined,
  }
  return { ...params, ...transitiveParams }
}

export const buildIframeSrc = (params: BuildIframeSrcOptions): string => {
  const { formId, type, embedId, options } = params
  const queryParams = mapOptionsToQueryParams(type, embedId, addDefaultUrlOptions(options))

  const url = new URL(`https://form.typeform.com/to/${formId}`)

  Object.entries(queryParams)
    .filter(([, paramValue]) => isDefined(paramValue))
    .forEach(([paramName, paramValue]) => {
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
