export type Transformation = 'string' | 'boolean'

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

export const transformAttributeValue = (value: string | null, transformation: Transformation) => {
  switch (transformation) {
    case 'string':
      return value || undefined
    case 'boolean':
      return value === '' || value === 'yes' || value === 'true'
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
