import { sendGaIdMessage, setupGaInstance } from './setup-google-analytics-instance'

jest.useFakeTimers()

describe('setup-google-analytics-instance', () => {
  const iframePostMessageSpy = jest.fn()
  const iframeMock: any = {
    contentWindow: {
      postMessage: iframePostMessageSpy,
    },
  }

  beforeEach(() => {
    iframeMock.contentWindow.postMessage.mockClear()
  })

  describe('#sendGaIdMessage', () => {
    it('should send a post message with GA client Id', () => {
      const expectedData = {
        type: 'ga-client-id',
        data: {
          embedId: 'embed-id-foobar',
          gaClientId: 'ga.client.id.foobar',
        },
      }

      sendGaIdMessage('embed-id-foobar', 'ga.client.id.foobar', iframeMock)

      jest.runAllTimers()

      expect(iframePostMessageSpy).toHaveBeenCalledWith(expectedData, '*')
    })
  })

  describe('#setupGaInstance', () => {
    const makeTracker = (trackingId = '', clientId = '') => ({
      get: (value = '') => {
        switch (value) {
          case 'trackingId':
            return trackingId
          case 'clientId':
            return clientId
          default:
            return null
        }
      },
    })
    const GoogleAnalyticsObjectMock = {
      getAll: jest
        .fn()
        .mockReturnValue([
          makeTracker('UA-tracking-1', 'client.identifier'),
          makeTracker('UA-tracking-2', 'different.client.identifier'),
          makeTracker('UA-tracking-3', 'one.more.client.identifier'),
        ]),
    }
    window['GoogleAnalyticsObject'] = 'ga'
    window['ga'] = GoogleAnalyticsObjectMock

    it('uses first GA tracker', () => {
      setupGaInstance(iframeMock, 'embed-id-value')
      jest.runAllTimers()
      expect(iframePostMessageSpy.mock.calls[0][0].data).toEqual({
        embedId: 'embed-id-value',
        gaClientId: 'client.identifier',
      })
    })

    it('uses specified GA tracker', () => {
      setupGaInstance(iframeMock, 'embed-id-value', 'UA-tracking-2')
      jest.runAllTimers()
      expect(iframePostMessageSpy.mock.calls[0][0].data).toEqual({
        embedId: 'embed-id-value',
        gaClientId: 'different.client.identifier',
      })
    })
  })
})
