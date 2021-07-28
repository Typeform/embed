import { BaseOptions, EmbedType, UrlOptions } from '../base'
import { FORM_BASE_URL } from '../constants'

import { removeUndefinedKeys } from './remove-undefined-keys'
import { isDefined } from './is-defined'
import { getTransitiveSearchParams } from './get-transitive-search-params'

const getDefaultUrlOptions = (): UrlOptions => ({
  source: window?.location?.hostname.replace(/^www\./, ''),
  medium: 'embed-sdk',
  mediumVersion: 'next',
})

const addDefaultUrlOptions = (options: UrlOptions): UrlOptions => {
  return { ...getDefaultUrlOptions(), ...removeUndefinedKeys(options) }
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
    'disable-tracking': options.disableTracking || options.enableSandbox ? 'true' : undefined,
    'disable-auto-focus': options.disableAutoFocus ? 'true' : undefined,
    '__dangerous-disable-submissions': options.enableSandbox ? 'true' : undefined,
    'share-ga-instance': options.shareGaInstance ? 'true' : undefined,
    'force-touch': options.forceTouch ? 'true' : undefined,
    'add-placeholder-ws': type === 'widget' && options.enableFullscreen ? 'true' : undefined,
  }
  return { ...params, ...transitiveParams }
}

const getBaseUrl = (formId: string, chat: boolean = false): URL => {
  const prefix = chat ? 'c' : 'to'
  return new URL(`${FORM_BASE_URL}/${prefix}/${formId}`)
}

export const buildIframeSrc = (params: BuildIframeSrcOptions): string => {
  const { formId, type, embedId, options } = params
  const queryParams = mapOptionsToQueryParams(type, embedId, addDefaultUrlOptions(options))

  const url = getBaseUrl(formId, options.chat)

  Object.entries(queryParams)
    .filter(([, paramValue]) => isDefined(paramValue))
    .forEach(([paramName, paramValue]) => {
      url.searchParams.set(paramName, paramValue)
    })

  if (options.hidden) {
    const tmpHashUrl = new URL(FORM_BASE_URL)
    Object.entries(options.hidden)
      .filter(([, paramValue]) => isDefined(paramValue))
      .forEach(([paramName, paramValue]) => {
        tmpHashUrl.searchParams.set(paramName, paramValue)
      })
    const hiddenFields = tmpHashUrl.searchParams.toString()
    if (hiddenFields) {
      url.hash = hiddenFields
    }
  }

  return url.href
}

type BuildIframeSrcOptions = {
  formId: string
  embedId: string
  type: EmbedType
  options: BaseOptions & UrlOptions
}
