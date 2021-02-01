import { EmbedType } from '../../base'
import { buildIframeSrc } from '../../utils'

import { IframeFactoryOptions } from './iframe-factory-options'

export const getIframeFactory = (formUrl: string, type: EmbedType, options: IframeFactoryOptions) => () => {
  const src = buildIframeSrc(formUrl, type, options)

  const iframe = document.createElement('iframe')
  iframe.src = src

  return iframe
}
