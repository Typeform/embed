export const overrideFullScreenStyles = (container: HTMLElement, iframe: HTMLElement) => {
  Object.assign(container.style, {
    zIndex: '10001',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  })
  iframe.style.borderRadius = '0'
  Object.assign(document.body.style, {
    overflow: 'hidden',
  })
}
