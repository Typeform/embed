import { isDefined } from './is-defined'

export const removeUndefinedKeys = (obj: Record<string, unknown>): Record<string, unknown> => {
  return Object.entries(obj)
    .filter(([, value]) => isDefined(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}
