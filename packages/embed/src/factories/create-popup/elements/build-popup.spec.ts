import { buildPopup } from './build-popup'

describe('build-popup', () => {
  describe('#buildPopup', () => {
    const iframe = document.createElement('iframe')
    const popup = buildPopup(iframe)

    it('should render popup wrapper', () => {
      expect(popup.className).toBe('typeform-popup')
    })

    it('should render iframe', () => {
      expect(iframe.parentNode).toBe(popup)
    })
  })
})
