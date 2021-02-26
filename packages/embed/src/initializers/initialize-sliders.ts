import { createSlider } from '../factories/create-slider'
import { includeCss } from '../utils'
import { SLIDER_ATTRIBUTE } from '../constants'

import { buildOptionsFromAttributes } from './build-options-from-attributes'

export const initializeSliders = () => {
  const sliderElements = document.querySelectorAll<HTMLElement>(`[${SLIDER_ATTRIBUTE}]`)

  if (sliderElements.length > 0) {
    includeCss('slider.css')
  }

  Array.from(sliderElements).forEach((button, index) => {
    const formId = button.getAttribute(SLIDER_ATTRIBUTE)
    if (!formId) {
      throw new Error(`Invalid ${SLIDER_ATTRIBUTE}=${formId} for popup embed #${index}`)
    }
    const options = buildOptionsFromAttributes(button, {
      position: 'string',
      width: 'integer',
    })
    const { toggle } = createSlider(formId, options)
    button.onclick = toggle
  })
}
