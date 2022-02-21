export const setIconColor = (el: HTMLElement): HTMLElement => {
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.data?.theme) {
      const { color } = e.data.theme
      el.style.color = color
    }
  })
  return el
}
