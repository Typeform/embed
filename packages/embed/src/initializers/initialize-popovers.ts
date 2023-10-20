import { createPopover, PopoverOptions } from '../factories/create-popover'
import { POPOVER_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializePopovers = ({
  container,
  forceReload = false,
}: {
  container?: HTMLElement
  forceReload?: boolean
}) => {
  initialize({
    embedElementAttribute: POPOVER_ATTRIBUTE,
    cssFilename: 'popover.css',
    container,
    forceReload,
    factoryMethod: (formId, options, button) => {
      const { toggle } = createPopover(formId, options as PopoverOptions)
      button.onclick = toggle
    },
  })
}
