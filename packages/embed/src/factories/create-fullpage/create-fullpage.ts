import { createIframe } from '../../utils'

import { buildFullpage } from './elements'

export type Fullpage = {
  refresh: () => void
}

export const createFullpage = (formId: string): Fullpage => {
  const existingFullpage = document.querySelector('.typeform-fullpage')
  if (existingFullpage) {
    existingFullpage.parentNode?.removeChild(existingFullpage)
  }

  const iframe = createIframe(formId, 'fullpage', {})
  const widget = buildFullpage(iframe)

  document.body.append(widget)

  return {
    refresh: () => iframe.contentWindow?.location.reload(),
  }
}
