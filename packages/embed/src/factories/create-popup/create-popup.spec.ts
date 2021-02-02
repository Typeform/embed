import { createPopup, Popup } from './create-popup'

describe('create-popup', () => {
  describe('#createPopup', () => {
    let popup: Popup

    beforeAll(() => {
      popup = createPopup('url', {})
    })

    it('should return open method', () => {
      expect(typeof popup.open).toBe('function')
    })

    it('should return close method', () => {
      expect(typeof popup.close).toBe('function')
    })

    it('should return refresh method', () => {
      expect(typeof popup.refresh).toBe('function')
    })
  })
})
