const openOnExit = (exitThreshold: number, open: () => void) => {
  let prevY = 0
  const handleMouseMove = (event: MouseEvent) => {
    // open popup  if the mouse is in top part of the page and moving towards top of the screen
    if (event.clientY < exitThreshold && event.clientY < prevY) {
      document.removeEventListener('mousemove', handleMouseMove)
      open()
    } else {
      prevY = event.clientY
    }
  }
  document.addEventListener('mousemove', handleMouseMove)
}

const openOnScroll = (scrollThreshold: number, open: () => void) => {
  const handleScroll = () => {
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
}

export const handleCustomOpen = (open: () => void, openType: string, value?: number) => {
  switch (openType) {
    case 'load':
      open()
      break
    case 'exit':
      value && openOnExit(value, open)
      break
    case 'time':
      setTimeout(() => {
        open()
      }, value)
      break
    case 'scroll':
      value && openOnScroll(value, open)
      break
    default:
      // do not open automatically
      break
  }
}
