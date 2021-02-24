import { createIframe } from '../../utils'
import { Embed, EmbedBlueprint, EmbedOptions, EmbedRefreshable, EmbedType } from '../../base'
import { getFormReadyHandler } from '../../utils/create-iframe/get-form-event-handler'
import { generateEmbedId } from '../../utils/create-iframe/generate-embed-id'

import { buildCloseButton, buildEmbed } from './elements'

interface HTMLElementWithParentNode extends HTMLElement {
  parentNode: Node & ParentNode
}

const isOpen = (embed: HTMLElement): embed is HTMLElementWithParentNode => !!embed.parentNode

export const createEmbed = (formId: string, embedType: EmbedType, options: EmbedOptions): Embed | EmbedRefreshable => {
  const { closeable, toggleHandlers } = EmbedBlueprint[embedType]
  const embedId = generateEmbedId()
  const iframe = createIframe(formId, embedType, embedId, options)
  const embed = buildEmbed(iframe, `typeform-${embedType}`)
  const element = options.element
  const container = options.container || document.body

  let toggleOptions = {}
  const refresh = () => iframe.contentWindow?.location.reload()
  if (toggleHandlers) {
    const closeElements = Array.from(options.closeElements || [])
    const closeElementInnerHtml = closeElements.map((element) => element.innerHTML)

    const onReady = () => {
      closeElements.forEach((element: HTMLElement) => {
        element.innerHTML = '&times'
      })
      embed.classList.add('open')
    }

    const close = () => {
      isOpen(embed) && embed.parentNode.removeChild(embed)
      window.removeEventListener('message', getFormReadyHandler(embedId, { onReady }))
      closeElements.forEach((element: HTMLElement, index: number) => {
        element.innerHTML = closeElementInnerHtml[index]
      })
    }

    const open = () => {
      !isOpen(embed) && container.append(embed)
      if (closeElements) {
        closeElements.forEach((element: HTMLElement) => {
          element.innerHTML = 'Loading'
        })
        window.addEventListener('message', getFormReadyHandler(embedId, { onReady }))
      }
    }

    const toggle = () => (isOpen(embed) ? close() : open())
    toggleOptions = { close, open, toggle }

    if (closeable) {
      embed.append(buildCloseButton(close))
    }

    if (element) {
      toggleHandlers.forEach((handler) => {
        element[handler] = toggle
      })
    }
    return { refresh, ...toggleOptions }
  } else if (element) {
    element.innerHTML = ''
    element.append(embed)
  }
  return { refresh }
}
