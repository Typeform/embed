export const getTransitiveSearchParams = (transitiveSearchParams?: string[] | boolean) => {
  const url = new URL(window.location.href)

  if (typeof transitiveSearchParams === 'boolean' && transitiveSearchParams) {
    return Object.fromEntries(url.searchParams.entries())
  }

  if (Array.isArray(transitiveSearchParams) && transitiveSearchParams.length > 0) {
    return transitiveSearchParams.reduce((queryParamsMap, key) => {
      const keyValue = url.searchParams.get(key)
      if (keyValue) {
        return { ...queryParamsMap, [key]: keyValue }
      }

      return queryParamsMap
    }, {})
  }

  return {}
}
