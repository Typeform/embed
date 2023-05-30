export const fetchSingleEmbed = async (formId: string, embedId: string) => {
  const response = await fetch(`https://api.typeform.com/single-embed/${formId}-${embedId}`)

  if (!response.ok) {
    throw new Error(`Cannot fetch embed ${embedId} for form ${formId}`)
  }

  return await response.json()
}
