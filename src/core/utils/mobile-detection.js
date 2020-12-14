export const isScreenBig = () => {
  return window.screen.width >= 1024 && window.screen.height >= 768
}

export const isMobile = (ua) => {
  return /mobile|tablet|android/i.test(ua.toLowerCase())
}
