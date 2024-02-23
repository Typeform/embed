import { BehavioralOptions } from '../base'

export type RemoveHandler = { remove: () => void }

const emptyHandler: RemoveHandler = { remove: () => {} }

const openOnExit = (exitThreshold: number, open: () => void): RemoveHandler => {
  let prevY = 0

  const handleMouseMove = (event: MouseEvent) => {
    // open popup  if the mouse is in top part of the page and moving towards top of the screen
    if (event.clientY < exitThreshold && event.clientY < prevY) {
      document.removeEventListener('mousemove', handleMouseMove, true)
      open()
    } else {
      prevY = event.clientY
    }
  }

  document.addEventListener('mousemove', handleMouseMove, true)

  return {
    remove: () => document.removeEventListener('mousemove', handleMouseMove, true),
  }
}

const openOnScroll = (scrollThreshold: number, open: () => void): RemoveHandler => {
  function handleScroll() {
    const offsetTop = window.pageYOffset || document.documentElement.scrollTop
    const clientTop = document.documentElement.clientTop || 0
    const pageHeight = document.documentElement.scrollHeight
    const scrollTopPixels = offsetTop - clientTop
    const scrollTopPercentage = (scrollTopPixels / pageHeight) * 100
    const scrolledToTheBottom = scrollTopPixels + window.innerHeight >= pageHeight

    if (scrollTopPercentage >= scrollThreshold || scrolledToTheBottom) {
      open()
      document.removeEventListener('scroll', handleScroll)
    }
  }

  document.addEventListener('scroll', handleScroll)

  return {
    remove: () => document.removeEventListener('scroll', handleScroll),
  }
}

export const handlePreventReopenOnClose = (options: BehavioralOptions, formId: string) => {
  options.preventReopenOnClose && setPreventReopenOnCloseCookieValue(formId)
}

const hasOpenModalEmbedInPage = () => {
  const elm = document.querySelector(
    '.tf-v1-popup, .tf-v1-slider, .tf-v1-popover-wrapper, .tf-v1-sidetab-wrapper'
  ) as HTMLElement
  return !!(elm?.offsetHeight || elm?.offsetWidth || elm?.getClientRects()?.length)
}

const hasOpenModalEmbedInPageWithFormId = (formId: string) => {
  const elms = document.querySelectorAll('.tf-v1-popup, .tf-v1-slider, .tf-v1-popover-wrapper, .tf-v1-sidetab-wrapper')
  return Array.from(elms).some((elm) => {
    const iframeSrc = elm.querySelector('iframe')?.src
    return iframeSrc?.includes(`typeform.com/to/${formId}`) || iframeSrc?.startsWith(formId)
  })
}

const openWithConditions =
  (open: () => void, formId: string, respectOpenModals?: 'all' | 'same', preventReopenOnClose?: boolean) => () => {
    if (preventReopenOnClose && getPreventReopenOnCloseCookieValue(formId)) {
      return
    }
    if (respectOpenModals === 'all' && hasOpenModalEmbedInPage()) {
      return
    }
    if (respectOpenModals === 'same' && hasOpenModalEmbedInPageWithFormId(formId)) {
      return
    }
    return open()
  }

export const handleCustomOpen = (openFn: () => void, options: BehavioralOptions, formId: string) => {
  const { open: openType, openValue: value, preventReopenOnClose, respectOpenModals } = options
  const open = openWithConditions(openFn, formId, respectOpenModals, preventReopenOnClose)

  switch (openType) {
    case 'load':
      open()
      return emptyHandler
    case 'exit':
      if (value) {
        return openOnExit(value, open)
      }
      return emptyHandler
    case 'time':
      setTimeout(() => {
        open()
      }, value)
      return emptyHandler
    case 'scroll':
      if (value) {
        return openOnScroll(value, open)
      }
      return emptyHandler
    default:
      return emptyHandler
    // do not open automatically
  }
}

const getPreventReopenOnCloseCookieValue = (formId: string): boolean => {
  return document.cookie.includes(`tf-${formId}-closed=true`)
}

const setPreventReopenOnCloseCookieValue = (formId: string) => {
  document.cookie = `tf-${formId}-closed=true;Path=/`
}
