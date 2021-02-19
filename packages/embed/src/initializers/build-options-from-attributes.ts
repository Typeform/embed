import { loadOptionsFromAttributes } from '../utils/load-options-from-attributes'

export const buildOptionsFromAttributes = (element: HTMLElement) => {
  return loadOptionsFromAttributes(element, {
    source: 'string',
    medium: 'string',
    mediumVersion: 'string',
    hideFooter: 'boolean',
    hideHeaders: 'boolean',
    opacity: 'integer',
  })
}
