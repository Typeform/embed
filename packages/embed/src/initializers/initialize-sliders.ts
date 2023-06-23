import { createSlider, SliderOptions } from '../factories/create-slider'
import { SLIDER_ATTRIBUTE } from '../constants'
import { invokeWithoutDefault } from '../utils'

import { initialize } from './initialize'

export const initializeSliders = (forceReload: boolean = false) => {
  initialize(SLIDER_ATTRIBUTE, 'slider.css', forceReload, (formId, options, button) => {
    const { toggle } = createSlider(formId, options as SliderOptions)
    button.onclick = invokeWithoutDefault(toggle)
  })
}
