export const removeUndefinedKeys = (obj: Record<string, any>): Record<string, any> => {
  return Object.entries(obj)
    .filter(([, value]) => value != null)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}
