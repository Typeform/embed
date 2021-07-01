import { ActionableOptions, UrlOptions } from '../../base'

export interface FormReadyOptionTypes extends ActionableOptions, UrlOptions {}

export const getFormReadyHandler = (embedId: string, callback?: () => void) => {
  return getFormEventHandler('form-ready', embedId, callback)
}

export const getFormQuestionChangedHandler = (embedId: string, options: ActionableOptions) => {
  return getFormEventHandler('form-screen-changed', embedId, options.onQuestionChanged)
}

export const getFormSubmitHandler = (embedId: string, options: ActionableOptions) => {
  return getFormEventHandler('form-submit', embedId, options.onSubmit)
}

export function getFormEventHandler(eventType: string, expectedEmbedId: string, callback?: (ev: any) => void) {
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
