import { sendGaIdMessage, setupGaInstance } from './setup-google-analytics-instance'

jest.useFakeTimers()

describe('setup-google-analytics-instance', () => {
  describe('#sendGaIdMessage', () => {
    it('should send a post message with GA client Id', () => {
      const iframePostMessageSpy = jest.fn()
      const iframeMock = {
        contentWindow: {
          postMessage: iframePostMessageSpy,
        },
      }
      const expectedData = {
        type: 'ga-client-id',
        data: {
          embedId: 'embed-id',
          gaClientId: 'ga-client-id',
        },
      }

      sendGaIdMessage('embed-id', 'ga-client-id', iframeMock as any)

      jest.runAllTimers()

      expect(iframePostMessageSpy).toHaveBeenCalledWith(expectedData, '*')
    })
  })

  describe('#setupGaInstance', () => {
    it('calls GA object correctly', () => {
      const iframe = document.createElement('iframe')
      const GoogleAnalyticsObjectMock = jest.fn(() => ({
        tracker: {
          get: jest.fn(),
        },
      }))
      window['GoogleAnalyticsObject'] = 'ga'
      window['ga'] = GoogleAnalyticsObjectMock as any

      jest.runAllTimers()
      setupGaInstance(iframe, 'embed-id')
      expect(GoogleAnalyticsObjectMock).toHaveBeenCalledTimes(1)
    })
  })
})
