export const camelCaseToKebabCase = (value: string) => {
  return value
    .split('')
    .map((letter, i) => {
      if (letter.toUpperCase() === letter) {
        return `${i !== 0 ? '-' : ''}${letter.toLowerCase()}`
      }
      return letter
    })
    .join('')
}

export type Transformation = 'string' | 'boolean' | 'integer' | 'function'

const transformString = (value: string | null): string | undefined => {
  return value || undefined
}

const transformBoolean = (value: string | null): boolean => {
  return value === '' || value === 'yes' || value === 'true'
}

const transformInteger = (value: string | null): number | undefined => {
  const integer = value ? parseInt(value, 10) : NaN
  return isNaN(integer) ? undefined : integer
}

const transformFunction = (value: string | null): Function | undefined => {
  const fn = value && value in window ? window[value] : undefined
  return typeof fn === 'function' ? fn : undefined
}

export const transformAttributeValue = (value: string | null, transformation: Transformation) => {
  switch (transformation) {
    case 'string':
      return transformString(value)
    case 'boolean':
      return transformBoolean(value)
    case 'integer':
      return transformInteger(value)
    case 'function':
      return transformFunction(value)
    default:
      throw new Error(`Invalid attribute transformation ${transformation}`)
  }
}

export const loadOptionsFromAttributes = (element: HTMLElement, transform: Record<string, Transformation>) => {
  return Object.keys(transform).reduce((options, key) => {
    return {
      ...options,
      [key]: transformAttributeValue(element.getAttribute(`data-tf-${camelCaseToKebabCase(key)}`), transform[key]),
    }
  }, {} as any)
}
