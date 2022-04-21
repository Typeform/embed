import { isMobile } from './mobile'

// this ensures the form is not covered by browser navbar on mobile devices
export const makeAutoResize = (wrapperElm: HTMLElement) => () => {
  if (wrapperElm && isMobile()) {
    wrapperElm.style.setProperty('height', `${window.innerHeight}px`, 'important')
  }
}
