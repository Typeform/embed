export const includeCss = (href: string) => {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = href
    document.head.append(css)
  }
}
