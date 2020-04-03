export const isScreenBig = () => {
  return window.screen.width >= 1024 && window.screen.height >= 768
}

export const isMobile = ua => {
  return /mobile|tablet|android/i.test(ua.toLowerCase())
}

export const isSafari = ua => {
  return /^((?!chrome|android).)*safari/i.test(ua.toLowerCase())
}

export const isIOSDevice = ua => {
  return /ip(hone|od|ad)/i.test(ua.toLowerCase())
}
