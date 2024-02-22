const updateUrlWithHash = (currentUrl: string, newUrl: string): string => {
  if (!newUrl.includes('#')) {
    return newUrl
  }
  if (!newUrl.startsWith(`${currentUrl}#`)) {
    return newUrl
  }
  if (newUrl.includes('?')) {
    return newUrl.replace('#', `&tf-embed-ts=${Date.now()}#`)
  }
  return newUrl.replace('#', `?tf-embed-ts=${Date.now()}#`)
}
export const handleFormRedirect =
  (iframe: HTMLIFrameElement) =>
  ({ url, target = '_parent' }: { url: string; target?: string }) => {
    if (!url) {
      // eslint-disable-next-line no-console
      console.error('Redirect failed, no URL provided')
      return
    }

    switch (target) {
      case '_self':
        iframe.src = updateUrlWithHash(iframe.src, url)
        break
      case '_blank':
        window.open(url, '_blank')
        break
      case '_top':
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.target = '_top'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        break
      default:
      case '_parent':
        window.location.href = url
        break
    }
  }
