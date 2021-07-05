import { getFormSubmitHandler } from './create-iframe/get-form-event-handler'

export const setAutoClose = (embedId: string, autoClose?: number | boolean, closeCallback?: () => void) => {
  if (autoClose && closeCallback) {
    const autoCloseTime = typeof autoClose === 'number' ? autoClose : 0

    window.addEventListener(
      'message',
      getFormSubmitHandler(embedId, () => setTimeout(closeCallback, autoCloseTime))
    )
  }
}
