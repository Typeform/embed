import { EmbedType } from '../base'
import { createEmbed } from '../factories/create-embed/create-embed'
import { includeCss } from '../utils'

export const initializer = (embedType: EmbedType) => {
  const dataAttribute = `data-tf-${embedType}`
  const embedElements = document.querySelectorAll<HTMLElement>(`[${dataAttribute}]`)

  if (embedElements.length > 0) {
    includeCss(`./lib/css/${embedType}.css`)
  }

  Array.from(embedElements).forEach((element, index) => {
    const formId = element.getAttribute(dataAttribute)
    if (!formId) {
      throw new Error(`Invalid ${dataAttribute}=${formId} for popup embed #${index}`)
    }
    createEmbed(formId, embedType, element, {})
  })
}
