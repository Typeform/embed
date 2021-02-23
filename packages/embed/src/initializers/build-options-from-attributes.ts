import { loadOptionsFromAttributes } from '../utils'

export const buildOptionsFromAttributes = (element: HTMLElement) => {
  return loadOptionsFromAttributes(element, {
    source: 'string',
    medium: 'string',
    mediumVersion: 'string',
    hideFooter: 'boolean',
    hideHeaders: 'boolean',
    opacity: 'integer',
    disableTracking: 'boolean',
    onReady: 'function',
    onSubmit: 'function',
    onQuestionChanged: 'function',
  })
}
