const getCssHref = (filename: string) => `${process.env.CSS_URL}${filename}`

export const includeCss = (filename: string) => {
  const href = getCssHref(filename)
  if (!document.querySelector(`link[href="${href}"]`)) {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = href
    document.head.append(css)
  }
}
