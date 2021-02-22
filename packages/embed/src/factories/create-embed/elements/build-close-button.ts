export const buildCloseButton = (closeCallback: () => void): HTMLAnchorElement => {
  const closeButton = document.createElement('a')
  closeButton.className = 'typeform-close'
  closeButton.innerHTML = '&times;'
  closeButton.onclick = closeCallback
  return closeButton
}
