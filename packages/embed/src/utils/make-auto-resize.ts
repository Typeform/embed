import { isMobile } from './mobile'

// this ensures the form is not covered by browser navbar on mobile devices
export const makeAutoResize = (wrapperElm: HTMLElement, onAllDevices = false) => () => {
  const canResize = onAllDevices || isMobile()
  if (wrapperElm && canResize) {
    wrapperElm.style.setProperty('height', `${window.innerHeight}px`, 'important')
  }
}
