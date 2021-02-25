export const getTransitiveSearchParams = (transitiveSearchParams?: string[]) => {
  const url = new URL(window.location.href)
  const queryParamsWithTransitiveParams = {}

  if (transitiveSearchParams && transitiveSearchParams.length > 0) {
    transitiveSearchParams.forEach((key: string) => {
      if (url.searchParams.has(key)) {
        queryParamsWithTransitiveParams[key] = url.searchParams.get(key)
      }
    })
  }

  return queryParamsWithTransitiveParams
}
