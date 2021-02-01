import { EmbedType, FactoryConfig } from '../../base'
import { createFullPage } from '../create-full-page'
import { createSidePanel } from '../create-side-panel'
import { createWidget } from '../create-widget'
import { getIframeFactory } from '../get-iframe-factory'

import { FormOptions } from './form-options'

export const createForm = <T extends EmbedType>(formUrl: string, type: T, options: FormOptions<T>) => {
  const createIframe = getIframeFactory(formUrl, type, options)
  const config: FactoryConfig = { createIframe }

  switch (type) {
    default:
      throw new Error(`Unknown embed type: ${type}`)
    case 'widget':
      return createWidget(config, options as any)
    case 'side_panel':
      return createSidePanel(config, options as any)
    case 'fullpage':
      return createFullPage(config, options as any)
    // TODO
  }
}
