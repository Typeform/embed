const POST_MESSAGE = 'form-close'
const KEY_EVENT = 'Escape'

const closeOnKeyEvent = async (evt: KeyboardEvent, close?: () => void) => {
  if (evt.code === KEY_EVENT && typeof close === 'function') {
    close()
    removeCustomKeyboardListener()
  }
}

export const addCustomKeyboardListener = (callback: () => void) =>
  window.document.addEventListener('keydown', (evt) => closeOnKeyEvent(evt, callback))

export const removeCustomKeyboardListener = () => window.document.removeEventListener('keydown', closeOnKeyEvent)

export const dispatchCustomKeyEventFromIframe = (evt: MessageEvent) => {
  if (evt.data.type === POST_MESSAGE) {
    window.document.dispatchEvent(new KeyboardEvent('keydown', { code: KEY_EVENT }))
  }
}
