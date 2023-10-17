import { createSlider, SliderOptions } from '../factories/create-slider'
import { SLIDER_ATTRIBUTE } from '../constants'
import { invokeWithoutDefault } from '../utils'

import { initialize } from './initialize'

export const initializeSliders = ({
  container,
  forceReload = false,
}: {
  container?: HTMLElement
  forceReload?: boolean
}) => {
  initialize({
    embedElementAttribute: SLIDER_ATTRIBUTE,
    cssFilename: 'slider.css',
    container,
    forceReload,
    factoryMethod: (formId, options, button) => {
      const { toggle } = createSlider(formId, options as SliderOptions)
      button.onclick = invokeWithoutDefault(toggle)
    },
  })
}
