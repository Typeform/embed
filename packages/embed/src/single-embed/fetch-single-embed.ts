export const fetchSingleEmbed = async (formId: string, embedId: string) => {
  const response = await fetch(`https://api.typeform.com/forms/${formId}/embeds/${embedId}`)

  if (!response.ok) {
    throw new Error(`Cannot fetch embed ${embedId} for form ${formId}`)
  }

  const {
    type,
    config: { html },
  } = await response.json()

  return { type, html }
}
