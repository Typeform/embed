import { createSidetab } from '../factories/create-sidetab'
import { SIDETAB_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializeSidetabs = (forceReload: boolean = false) => {
  initialize(SIDETAB_ATTRIBUTE, 'sidetab.css', forceReload, (formId, options) => {
    createSidetab(formId, options)
  })
}
