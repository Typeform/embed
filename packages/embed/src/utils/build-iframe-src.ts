import { ActionableOptions, BaseOptions, EmbedType, SizeableOptions, UrlOptions } from '../base'
import { DEFAULT_DOMAIN } from '../constants'

import { removeUndefinedKeys } from './remove-undefined-keys'
import { isDefined } from './is-defined'
import { getTransitiveSearchParams } from './get-transitive-search-params'
import { getHubspotHiddenFields } from './hubspot'

const getDefaultUrlOptions = (): UrlOptions => ({
  source: window?.location?.hostname.replace(/^www\./, ''),
  medium: 'embed-sdk',
  mediumVersion: 'next',
})

const addDefaultUrlOptions = (options: UrlOptions): UrlOptions => {
  if (!options.noHeading) {
    options.noHeading = document.querySelectorAll('h1').length > 0
  }

  return { ...getDefaultUrlOptions(), ...removeUndefinedKeys(options) }
}

const typesToEmbed: Record<EmbedType, string> = {
  widget: 'embed-widget', // TODO: when widget is full page use 'embed-fullpage'
  popup: 'popup-blank',
  slider: 'popup-drawer',
  popover: 'popup-popover',
  'side-tab': 'popup-side-panel',
}

const mapOptionsToQueryParams = (
  type: EmbedType,
  embedId: string,
  options: UrlOptions & SizeableOptions & ActionableOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  const {
    transitiveSearchParams,
    source,
    medium,
    mediumVersion,
    hideFooter,
    hideHeaders,
    opacity,
    disableTracking,
    enableSandbox,
    shareGaInstance,
    forceTouch,
    displayAsFullScreenModal,
    tracking,
    redirectTarget,
    autoResize,
    disableScroll,
    onEndingButtonClick,
    noHeading,
  } = options
  const transitiveParams = getTransitiveSearchParams(transitiveSearchParams)
  const params = {
    'typeform-embed-id': embedId,
    'typeform-embed': typesToEmbed[type],
    'typeform-source': source,
    'typeform-medium': medium,
    'typeform-medium-version': mediumVersion,
    'embed-hide-footer': hideFooter ? 'true' : undefined,
    'embed-hide-headers': hideHeaders ? 'true' : undefined,
    'embed-opacity': opacity,
    'disable-tracking': disableTracking || enableSandbox ? 'true' : undefined,
    '__dangerous-disable-submissions': enableSandbox ? 'true' : undefined,
    'share-ga-instance': shareGaInstance ? 'true' : undefined,
    'force-touch': forceTouch ? 'true' : undefined,
    'add-placeholder-ws': type === 'widget' && displayAsFullScreenModal ? 'true' : undefined,
    'typeform-embed-redirect-target': redirectTarget,
    'typeform-embed-handles-redirect': 1,
    'typeform-embed-auto-resize': autoResize ? 'true' : undefined,
    'typeform-embed-disable-scroll': disableScroll ? 'true' : undefined,
    'typeform-embed-handle-ending-button-click': !!onEndingButtonClick ? 'true' : undefined,
    'typeform-embed-no-heading': noHeading ? 'true' : undefined,
  }
  return { ...params, ...transitiveParams, ...tracking }
}

const getBaseUrl = (formString: string, domain = DEFAULT_DOMAIN): URL => {
  if (formString.startsWith('http://') || formString.startsWith('https://')) {
    return new URL(formString)
  }

  return new URL(`https://${domain}/to/${formString}`)
}

const makePreselectParam = (preselect?: Record<string, string>) => {
  if (!preselect) {
    return null
  }
  const questionRef = Object.keys(preselect).at(0)
  const answerRef = (questionRef && preselect[questionRef]) || undefined

  if (questionRef === undefined || answerRef === undefined) {
    return null
  }
  return {
    key: `answers-${questionRef}`,
    value: answerRef,
  }
}

const buildHashParams = (url: URL, options: BaseOptions & UrlOptions): string => {
  const hashParams = new URLSearchParams()

  if (options.hidden) {
    Object.entries(options.hidden)
      .filter(([, paramValue]) => isDefined(paramValue) && paramValue !== '')
      .forEach(([paramName, paramValue]) => {
        // if transitive params is true, make hidden field values take priority over transitive params
        if (typeof options.transitiveSearchParams === 'boolean') {
          url.searchParams.delete(paramName)
        }
        hashParams.set(paramName, paramValue)
      })
  }

  const preselectParam = makePreselectParam(options.preselect)
  if (preselectParam) {
    const { key, value } = preselectParam
    hashParams.set(key, value)
  }

  return hashParams.toString()
}

export const buildIframeSrc = (params: BuildIframeSrcOptions): string => {
  const { domain, formId, type, embedId, options } = params
  const queryParams = mapOptionsToQueryParams(type, embedId, addDefaultUrlOptions(options))

  const url = getBaseUrl(formId, domain)

  Object.entries(queryParams)
    .filter(([, paramValue]) => isDefined(paramValue))
    .forEach(([paramName, paramValue]) => {
      url.searchParams.set(paramName, paramValue)
    })

  if (options.hubspot) {
    const hubspotHiddenFields = getHubspotHiddenFields()
    options.hidden = { ...options.hidden, ...hubspotHiddenFields }
  }

  url.hash = buildHashParams(url, options)

  return url.href
}

type BuildIframeSrcOptions = {
  domain?: string
  formId: string
  embedId: string
  type: EmbedType
  options: BaseOptions & UrlOptions
}
