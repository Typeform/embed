import { FactoryConfig } from '../../base'

import { SidePanelOptions } from './side-panel-options'

export const createSidePanel = (_config: FactoryConfig, _options: SidePanelOptions) => {
  return {
    open: () => {},
    close: () => {},
    refresh: () => {},
  }
}
