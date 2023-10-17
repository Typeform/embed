import { createWidget, WidgetOptions } from '../factories/create-widget'
import { WIDGET_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializeWidgets = ({
  container,
  forceReload = false,
}: {
  container?: HTMLElement
  forceReload?: boolean
}) => {
  initialize({
    embedElementAttribute: WIDGET_ATTRIBUTE,
    cssFilename: 'widget.css',
    container,
    forceReload,
    factoryMethod: (formId, options, container) => {
      createWidget(formId, { ...(options as WidgetOptions), container })
    },
  })
}
