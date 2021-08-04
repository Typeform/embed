type callbackFn = (ev?: any) => void

export const getFormReadyHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-ready', embedId, callback)
}

export const getFormQuestionChangedHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-screen-changed', embedId, callback)
}

export const getFormSubmitHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-submit', embedId, callback)
}

export const getWelcomeScreenHiddenHandler = (embedId: string, element: HTMLElement) => {
  const callback = () => {
    element.classList.add('typeform-widget-fullscreen')
  }
  return getFormEventHandler('welcome-screen-hidden', embedId, callback)
}

export function getFormEventHandler(eventType: string, expectedEmbedId: string, callback?: callbackFn) {
  return (event: any) => {
    const { type, embedId, ...data } = event.data
    if (type !== eventType) {
      return
    }
    if (embedId !== expectedEmbedId) {
      return
    }

    callback?.(data)
  }
}
