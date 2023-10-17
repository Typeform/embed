import { createSidetab, SidetabOptions } from '../factories/create-sidetab'
import { SIDETAB_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializeSidetabs = ({
  container,
  forceReload = false,
}: {
  container?: HTMLElement
  forceReload?: boolean
}) => {
  initialize({
    embedElementAttribute: SIDETAB_ATTRIBUTE,
    cssFilename: 'sidetab.css',
    container,
    forceReload,
    factoryMethod: (formId, options) => {
      createSidetab(formId, options as SidetabOptions)
    },
  })
}
