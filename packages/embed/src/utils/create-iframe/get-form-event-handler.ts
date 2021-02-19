import { ActionableOptions } from '../../base'

export const getFormReadyHandler = (embedId: string, options: ActionableOptions) => {
  return getFormEventHandler(embedId, options.onReady)
}

export const getFormScreenChangedHandler = (embedId: string, options: ActionableOptions) => {
  const getEventPayload = (ev: any) => ({ response_id: ev?.detail?.response_id })

  return getFormEventHandler(embedId, options.onScreenChanged, getEventPayload)
}

export const getFormSubmitHandler = (embedId: string, options: ActionableOptions) => {
  return getFormEventHandler(embedId, options.onSubmit)
}

export function getFormEventHandler(
  embedId: string,
  callback?: (ev: any) => void,
  transformEventPayload: (ev: any) => any = () => undefined
) {
  return (event: any) => {
    if (event.embedId !== embedId) {
      return
    }
    const transformedEvent = transformEventPayload(event)
    callback?.(transformedEvent)
  }
}
