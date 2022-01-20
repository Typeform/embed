export const refreshIframe = (iframe?: HTMLIFrameElement) => {
  if (iframe) {
    const source = iframe.src

    if (source.includes('&refresh')) {
      const splitURL = source.split('&refresh#')
      iframe.src = splitURL.join('#')
    } else {
      const splitURL = source.split('#')
      splitURL[0] = `${splitURL[0]}&refresh`
      iframe.src = splitURL.join('#')
    }
  }
}
