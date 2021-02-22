import { createIframe } from '../../utils'
import { Embed, EmbedBlueprint, EmbedOptions, EmbedType } from '../../base'

import { buildCloseButton, buildElement } from './elements'

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (embed: HTMLElement): embed is HTMLElementWithParentNode => !!embed.parentNode

export const createEmbed = (
  formId: string,
  embedType: EmbedType,
  element: HTMLElement,
  options: EmbedOptions
): Embed => {
  const { closeable, toggleHandlers } = EmbedBlueprint[embedType]
  const iframe = createIframe(formId, embedType, options)
  const embed = buildElement(iframe, `typeform-${embedType}`)
  const container = options.container || document.body

  let toggleOptions = {}
  if (toggleHandlers) {
    const close = () => isOpen(embed) && embed.parentNode.removeChild(embed)
    const open = () => !isOpen(embed) && container.append(embed)
    const toggle = () => (isOpen(embed) ? close() : open())
    toggleOptions = { close, open, toggle }
    if (closeable) {
      embed.append(buildCloseButton(close))
    }
    toggleHandlers.forEach((handler) => {
      element[handler] = toggle
    })
  } else {
    element.innerHTML = ''
    element.append(embed)
  }

  const refresh = () => iframe.contentWindow?.location.reload()

  return { refresh, ...toggleOptions }
}
