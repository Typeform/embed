import { FactoryConfig } from '../../base'

import { FullPageOptions } from './full-page-options'

export const createFullPage = (_config: FactoryConfig, _options: FullPageOptions) => {
  // TODO: Does it makes sense to call createWidget from here, with container option set to body?
  return {
    refresh: () => {},
  }
}
