type callbackFn = (ev?: any) => void

export const getFormReadyHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('form-ready', embedId, callback)
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

export const getFormThemeHandler = (embedId: string) => {
  return getFormEventHandler('form-theme', embedId, (data) => {
    if (data?.theme) {
      const closeButtonElement = document.querySelector('.tf-v1-close-icon') as HTMLElement
      if (closeButtonElement) {
        closeButtonElement.style.color = data.theme?.color
      }
    }
  })
}

export const getThankYouScreenButtonClickHandler = (embedId: string, callback?: callbackFn) => {
  return getFormEventHandler('thank-you-screen-button-click', embedId, callback)
}

function getFormEventHandler(eventType: string, expectedEmbedId: string, callback?: callbackFn) {
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
