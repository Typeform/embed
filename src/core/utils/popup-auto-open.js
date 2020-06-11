
const openOnExit = (popup, exitThreshold) => {
  let prevY = 0
  const handleMouseMove = (event) => {
    // open popup  if the mouse is in top part of the page and moving towards top of the screen
    if (event.clientY < exitThreshold && event.clientY < prevY) {
      popup.open()
      document.removeEventListener('mousemove', handleMouseMove)
    } else {
      prevY = event.clientY
    }
  }
  document.addEventListener('mousemove', handleMouseMove)
}

const openOnScroll = (popup, scrollThreshold) => {
  const handleScroll = () => {
    const offsetTop = window.pageYOffset || document.documentElement.scrollTop
    const clientTop = document.documentElement.clientTop || 0
    const scrollTopPixels = offsetTop - clientTop
    const scrollTopPercentage = scrollTopPixels / document.body.clientHeight * 100
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if (scrollTopPercentage >= scrollThreshold || scrollTopPixels + viewportHeight >= document.body.clientHeight) {
      popup.open()
      document.removeEventListener('scroll', handleScroll)
    }
  }
  document.addEventListener('scroll', handleScroll)
}

export const handleAutoOpen = (popup, open, value) => {
  switch (open) {
    case 'load':
      popup.open()
      break
    case 'exit':
      openOnExit(popup, parseInt(value, 10))
      break
    case 'time':
      const delayMilliseconds = parseInt(value, 10)
      setTimeout(() => {
        popup.open()
      }, delayMilliseconds)
      break
    case 'scroll':
      openOnScroll(popup, parseInt(value, 10))
      break
    default:
      // do not open automatically
      break
  }
}
