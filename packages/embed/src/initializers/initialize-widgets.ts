import { createWidget } from '../factories/create-widget'
import { WIDGET_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializeWidgets = (forceReload: boolean = false) => {
  initialize(WIDGET_ATTRIBUTE, 'widget.css', forceReload, (formId, options, container) => {
    createWidget(formId, { ...options, container })
  })
}
