export const isBigScreen = () => {
  return window.screen.width >= 1024 && window.screen.height >= 768
}

export const isMobile = () => {
  return /mobile|tablet|android/i.test(navigator.userAgent.toLowerCase())
}

export const isFullscreen = () => {
  return isMobile() && !isBigScreen()
}
