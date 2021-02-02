import { createWidget, Widget } from './create-widget'

describe('create-popup', () => {
  describe('#createPopup', () => {
    let popup: Widget

    beforeAll(() => {
      popup = createWidget('url', {})
    })

    it('should return refresh method', () => {
      expect(typeof popup.refresh).toBe('function')
    })
  })
})
