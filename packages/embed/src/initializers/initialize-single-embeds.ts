import { SINGLE_EMBED_ATTRIBUTE } from '../constants'
import { fetchSingleEmbed } from '../single-embed/fetch-single-embed'

export const initializeSingleEmbeds = async (forceReload: boolean) => {
  const embedTypeElements = document.querySelectorAll<HTMLElement>(`[${SINGLE_EMBED_ATTRIBUTE}]`)

  for (let index = 0; index < embedTypeElements.length; index += 1) {
    const element = embedTypeElements.item(index)
    if (forceReload || element.dataset.tfLoaded !== 'true') {
      const code = element.getAttribute(SINGLE_EMBED_ATTRIBUTE)
      if (!code) {
        throw new Error(`Invalid ${SINGLE_EMBED_ATTRIBUTE}=${code} for embed #${index}`)
      }

      const separatorPosition = code.indexOf('-')
      const formId = code.substring(0, separatorPosition)
      const embedId = code.substring(separatorPosition + 1)
      if (formId === '' || embedId === '') {
        throw new Error(`Invalid ${SINGLE_EMBED_ATTRIBUTE}=${code} for embed #${index}`)
      }

      const { html } = await fetchSingleEmbed(formId, embedId)
      element.innerHTML = html
      element.dataset.tfLoaded = 'true'
    }
  }
}
