import { getFormSubmitHandler } from './create-iframe/get-form-event-handler'

// wait at least 500ms by default to make sure all calls
// in embedded typeform can complete before closing
export const DEFAULT_AUTO_CLOSE_TIME = 500

const getAutoCloseTime = (time?: number | boolean) => {
  const autoCloseTime = typeof time === 'number' ? time : 0
  return Math.max(autoCloseTime, DEFAULT_AUTO_CLOSE_TIME)
}

export const setAutoClose = (embedId: string, autoClose?: number | boolean, closeCallback?: () => void) => {
  if (autoClose && closeCallback) {
    window.addEventListener(
      'message',
      getFormSubmitHandler(embedId, () => setTimeout(closeCallback, getAutoCloseTime(autoClose)))
    )
  }
}
