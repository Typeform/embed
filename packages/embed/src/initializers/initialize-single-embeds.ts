import { SINGLE_EMBED_ATTRIBUTE } from '../constants'
import { fetchSingleEmbed } from '../single-embed/fetch-single-embed'

export const initializeSingleEmbeds = async (forceReload: boolean) => {
  const embedTypeElements = document.querySelectorAll<HTMLElement>(`[${SINGLE_EMBED_ATTRIBUTE}]`)

  for (let index = 0; index < embedTypeElements.length; index += 1) {
    const element = embedTypeElements.item(index)
    if (forceReload || element.dataset.tfLoaded !== 'true') {
      const embedId = element.getAttribute(SINGLE_EMBED_ATTRIBUTE)
      if (!embedId) {
        throw new Error(`Invalid ${SINGLE_EMBED_ATTRIBUTE}=${embedId} for embed #${index}`)
      }

      const { html } = await fetchSingleEmbed(embedId)
      element.innerHTML = html
      element.dataset.tfLoaded = 'true'
    }
  }
}
