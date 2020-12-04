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
      popupMockElem.setAttribute('data-open', 'scroll')
      popupMockElem.setAttribute('data-open-value', 20)
      popupMockElem.setAttribute('data-hide-headers', '')
      popupMockElem.setAttribute('data-hide-footer', false)
      popupMockElem.setAttribute('data-invalid-attribute', true)
      popupMockElem.setAttribute('data-size', '15')
      popupMockElem.setAttribute('data-source', 'example.com')
      popupMockElem.setAttribute('data-medium', 'embed-snippet')
      popupMockElem.setAttribute('data-medium-version', '0.29.1')
      popupMockElem.setAttribute('data-embed-trigger-type', 'on_page_load')
      popupMockElem.setAttribute('data-share-google-analytics-instance', true)

      const popupOptions = {
        mode: 'popup',
        autoClose: 10,
        autoOpen: true,
        open: 'scroll',
        openValue: '20',
        hideHeaders: true,
        size: 15,
        source: 'example.com',
        medium: 'embed-snippet',
        mediumVersion: '0.29.1',
        shareGoogleAnalyticsInstance: true
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

    it('takes in account the data-transferable-url-parameters option and parse the options correctly', () => {
      const mockElement = document.createElement('div')
      mockElement.setAttribute('data-transferable-url-parameters', 'foo, bar,  john')
      expect(sanitizePopupAttributes(getDataset(mockElement))).toEqual({ transferableUrlParameters: ['foo', 'bar', 'john'] })
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
      widgetMockElem.setAttribute('data-share-google-analytics-instance', true)

      const widgetOptions = {
        hideHeaders: true,
        hideFooter: true,
        opacity: 100 - 20,
        shareGoogleAnalyticsInstance: true
      }

      expect(sanitizeWidgetAttributes(getDataset(widgetMockElem))).toEqual(widgetOptions)
    })

    it('takes in account the data-transferable-url-parameters option and parse the options correctly', () => {
      const widgetMockElem = document.createElement('div')
      widgetMockElem.setAttribute('data-transferable-url-parameters', ' foo,   bar,  john')
      expect(sanitizeWidgetAttributes(getDataset(widgetMockElem))).toEqual({ transferableUrlParameters: ['foo', 'bar', 'john'] })
    })
  })
})
