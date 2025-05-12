import { LIVE_EMBED_DATA_REGION_EU } from '../constants'

export const fetchLiveEmbed = async (embedId: string, region?: string) => {
  const baseUrl = resolveBaseUrl(region)
  const response = await fetch(`${baseUrl}/single-embed/${embedId}`)

  if (!response.ok) {
    throw new Error(`Cannot fetch embed ${embedId}`)
  }

  return await response.json()
}

function resolveBaseUrl(region?: string) {
  switch (region) {
    case LIVE_EMBED_DATA_REGION_EU:
      return 'https://api.typeform.eu'
    default:
      return 'https://api.typeform.com'
  }
}
