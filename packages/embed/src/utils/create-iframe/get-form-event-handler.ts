import { handleFormRedirect } from './handle-form-redirect'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type callbackFn = (data?: any) => void

export const getFormReadyHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-ready', embedId, callback)
}

export const getFormStartedHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-started', embedId, callback)
}

export const getFormQuestionChangedHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-screen-changed', embedId, callback)
}

export const getFormHeightChangedHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-height-changed', embedId, callback)
}

export const getFormSubmitHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-submit', embedId, callback)
}

export const getWelcomeScreenHiddenHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('welcome-screen-hidden', embedId, callback)
}

export const getFormThemeHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-theme', embedId, callback)
}

export const getThankYouScreenButtonClickHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('thank-you-screen-button-click', embedId, callback)
}

export const getRedirectHandler = (embedId: string, iframe: HTMLIFrameElement) => {
  return getFormEventHandler(
    ['redirect-after-submit', 'thank-you-screen-redirect'],
    embedId,
    handleFormRedirect(iframe)
  )
}

const isValidEventType = (expectedType: string | string[], type: string): boolean => {
  if (Array.isArray(expectedType)) {
    return expectedType.includes(type)
  }
  return expectedType === type
}

function getFormEventHandler(eventType: string | string[], expectedEmbedId: string, callback?: callbackFn) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (event: any) => {
    const { type, embedId, ...data } = event.data
    if (!isValidEventType(eventType, type)) {
      return
    }
    if (embedId !== expectedEmbedId) {
      return
    }
    callback?.(data)
  }
}
