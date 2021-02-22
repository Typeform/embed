import { ActionableOptions } from '../../base'

export const getFormReadyHandler = (embedId: string, options: ActionableOptions) => {
  return getFormEventHandler('form-ready', embedId, options.onReady)
}

export const getFormQuestionChangedHandler = (embedId: string, options: ActionableOptions) => {
  return getFormEventHandler('form-screen-changed', embedId, options.onQuestionChanged)
}

export const getFormSubmitHandler = (embedId: string, options: ActionableOptions) => {
  const getEventPayload = (ev: any) => ({ responseId: ev?.data?.response_id })

  return getFormEventHandler('form-submit', embedId, options.onSubmit, getEventPayload)
}

export function getFormEventHandler(
  eventType: string,
  embedId: string,
  callback?: (ev: any) => void,
  transformEventPayload: (ev: any) => any = () => undefined
) {
  return (event: any) => {
    if (event.data.type !== eventType) {
      return
    }
    if (event.data.embedId !== embedId) {
      return
    }
    const transformedEvent = transformEventPayload(event)
    callback?.(transformedEvent)
  }
}
