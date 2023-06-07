export const fetchLiveEmbed = async (embedId: string) => {
  const response = await fetch(`https://api.typeform.com/single-embed/${embedId}`)

  if (!response.ok) {
    throw new Error(`Cannot fetch embed ${embedId}`)
  }

  return await response.json()
}
