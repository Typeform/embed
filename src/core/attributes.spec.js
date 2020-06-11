import {
  getDataset,
  sanitizePopupAttributes,
  sanitizeWidgetAttributes
} from './attributes'

describe('Attributes', () => {
  describe('Popup', () => {
    it('returns only allowed popup attributes', () => {
      const popupMockElem = document.createElement('div')
      popupMockElem.setAttribute('data-mode', 'popup')
      popupMockElem.setAttribute('data-submit-close-delay', 10)
      popupMockElem.setAttribute('data-auto-open', true)
      popupMockElem.setAttribute('data-hide-headers', '')
      popupMockElem.setAttribute('data-hide-footer', false)
      popupMockElem.setAttribute('data-invalid-attribute', true)

      const popupOptions = {
        mode: 'popup',
        autoClose: 10,
        open: 'load',
        hideHeaders: true
      }

      expect(sanitizePopupAttributes(getDataset(popupMockElem))).toEqual(popupOptions)
    })

    it('transforms legacy data modes correctly', () => {
      const mockElement = document.createElement('div')
      mockElement.setAttribute('data-mode', '1')
      expect(sanitizePopupAttributes(getDataset(mockElement))).toEqual({ mode: 'popup' })
      mockElement.setAttribute('data-mode', '2')
      expect(sanitizePopupAttributes(getDataset(mockElement))).toEqual({
        mode: 'drawer_left'
      })
      mockElement.setAttribute('data-mode', '3')
      expect(sanitizePopupAttributes(getDataset(mockElement))).toEqual({
        mode: 'drawer_right'
      })
    })
  })

  describe('Widget', () => {
    it('returns only allowed widget attributes', () => {
      const widgetMockElem = document.createElement('div')
      widgetMockElem.setAttribute('data-hide-headers', true)
      widgetMockElem.setAttribute('data-hide-footer', '')
      widgetMockElem.setAttribute('data-scrollbars', false)
      widgetMockElem.setAttribute('data-invalid-attribute', true)
      widgetMockElem.setAttribute('data-transparency', 20)

      const widgetOptions = {
        hideHeaders: true,
        hideFooter: true,
        opacity: 100 - 20
      }

      expect(sanitizeWidgetAttributes(getDataset(widgetMockElem))).toEqual(widgetOptions)
    })
  })
})
