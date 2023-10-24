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

export type Transformation =
  | 'string'
  | 'boolean'
  | 'integer'
  | 'function'
  | 'array'
  | 'record'
  | 'integerOrString'
  | 'integerOrBoolean'
  | 'stringOrBoolean'
  | 'arrayOrBoolean'

const transformString = (value: string | null): string | undefined => {
  return value || undefined
}

const transformBoolean = (value: string | null): boolean | undefined => {
  if (value === null) {
    return undefined
  }

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

const COMMA_PLACEHOLDER = '%ESCAPED_COMMA%'

const transformArray = (value: string | null): string[] | undefined => {
  if (!value) {
    return undefined
  }
  return value
    .replace(/\s/g, '')
    .replace(/\\,/g, COMMA_PLACEHOLDER)
    .split(',')
    .filter((v) => !!v)
    .map((v) => v.replace(COMMA_PLACEHOLDER, ','))
}

const transformRecord = (value: string | null): Record<string, string> | undefined => {
  if (!value) {
    return undefined
  }
  const arrayOfRecordStrings = value
    .replace(/\\,/g, COMMA_PLACEHOLDER)
    .split(',')
    .filter((v) => !!v)
    .map((v) => v.replace(COMMA_PLACEHOLDER, ','))
  return arrayOfRecordStrings.reduce((record, recordString) => {
    const match = recordString.match(/^([^=]+)=(.*)$/)
    if (match) {
      const [, key, value] = match
      return { ...record, [key.trim()]: value }
    }
    return record
  }, {})
}

const transformIntegerOrString = (value: string | null): string | number | undefined => {
  if (!value) {
    return undefined
  }
  return value.match(/^[0-9]+$/) ? transformInteger(value) : transformString(value)
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
    case 'array':
      return transformArray(value)
    case 'record':
      return transformRecord(value)
    case 'integerOrString':
      return transformIntegerOrString(value)
    case 'integerOrBoolean':
      return transformInteger(value) ?? transformBoolean(value)
    case 'stringOrBoolean':
      return transformString(value) ?? transformBoolean(value)
    case 'arrayOrBoolean':
      return transformArray(value) ?? transformBoolean(value)
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
  }, {})
}
