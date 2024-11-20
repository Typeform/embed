import { LIVE_EMBED_ATTRIBUTE } from '../constants'
import { fetchLiveEmbed } from '../live-embed/fetch-live-embed'

export const initializeLiveEmbeds = ({
  forceReload,
  onLiveEmbedLoad,
}: {
  forceReload: boolean
  onLiveEmbedLoad: (element: HTMLElement) => void
}) => {
  const embedTypeElements = document.querySelectorAll<HTMLElement>(`[${LIVE_EMBED_ATTRIBUTE}]`)

  for (let index = 0; index < embedTypeElements.length; index += 1) {
    const element = embedTypeElements.item(index)
    const canBeLoaded = element.dataset.tfLoading !== 'true' && element.dataset.tfLoaded !== 'true'
    if (canBeLoaded || forceReload) {
      const embedId = element.getAttribute(LIVE_EMBED_ATTRIBUTE)
      if (!embedId) {
        throw new Error(`Invalid ${LIVE_EMBED_ATTRIBUTE}=${embedId} for embed #${index}`)
      }
      element.dataset.tfLoading = 'true'

      fetchLiveEmbed(embedId).then(({ html }) => {
        element.innerHTML = html
        onLiveEmbedLoad(element)
        delete element.dataset.tfLoading
        element.dataset.tfLoaded = 'true'
      })
    }
  }
}
