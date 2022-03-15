export type RemoveHandler = { remove: () => void }

const emptyHandler: RemoveHandler = { remove: () => {} }

const openOnExit = (exitThreshold: number, open: () => void): RemoveHandler => {
  let prevY = 0

  const handleMouseMove = (event: MouseEvent) => {
    // open popup  if the mouse is in top part of the page and moving towards top of the screen
    if (event.clientY < exitThreshold && event.clientY < prevY) {
      document.removeEventListener('mousemove', handleMouseMove, true)
      open()
    } else {
      prevY = event.clientY
    }
  }

  document.addEventListener('mousemove', handleMouseMove, true)

  return {
    remove: () => document.removeEventListener('mousemove', handleMouseMove, true),
  }
}

const openOnScroll = (scrollThreshold: number, open: () => void): RemoveHandler => {
  function handleScroll() {
    const offsetTop = window.pageYOffset || document.documentElement.scrollTop
    const clientTop = document.documentElement.clientTop || 0
    const pageHeight = document.documentElement.scrollHeight
    const scrollTopPixels = offsetTop - clientTop
    const scrollTopPercentage = (scrollTopPixels / pageHeight) * 100
    const scrolledToTheBottom = scrollTopPixels + window.innerHeight >= pageHeight

    if (scrollTopPercentage >= scrollThreshold || scrolledToTheBottom) {
      open()
      document.removeEventListener('scroll', handleScroll)
    }
  }

  document.addEventListener('scroll', handleScroll)

  return {
    remove: () => document.removeEventListener('scroll', handleScroll),
  }
}

export const handleCustomOpen = (open: () => void, openType: string, value?: number) => {
  switch (openType) {
    case 'load':
      open()
      return emptyHandler
    case 'exit':
      if (value) {
        return openOnExit(value, open)
      }
      return emptyHandler
    case 'time':
      setTimeout(() => {
        open()
      }, value)
      return emptyHandler
    case 'scroll':
      if (value) {
        return openOnScroll(value, open)
      }
      return emptyHandler
    default:
      return emptyHandler
    // do not open automatically
  }
}
