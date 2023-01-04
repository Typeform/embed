import { createSlider } from '../factories/create-slider'
import { SLIDER_ATTRIBUTE } from '../constants'

import { initialize } from './initialize'

export const initializeSliders = (forceReload: boolean = false) => {
  initialize(SLIDER_ATTRIBUTE, 'slider.css', forceReload, async (formId, options, button) => {
    const { toggle } = await createSlider(formId, options)
    button.onclick = toggle
  })
}
