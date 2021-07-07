import { createWidget } from './create-widget'

jest.useFakeTimers()

describe('create-widget', () => {
  describe('#createWidget', () => {
    const container = document.createElement('div')
    const containerAppendMock = jest.spyOn(container, 'append')
    const widgetMock = document.createElement('div')

    beforeAll(() => {
      jest.spyOn(require('./elements/build-widget'), 'buildWidget').mockImplementation(() => widgetMock)
      createWidget('url', { container })
    })

    it('should append widget to the container', () => {
      expect(containerAppendMock).toHaveBeenCalledTimes(1)
      expect(containerAppendMock).toHaveBeenCalledWith(widgetMock)
    })

    it('should render widget in container', () => {
      expect(widgetMock.parentNode).toBe(container)
    })

    describe('#refresh', () => {
      const iframeReloadSpy = jest.fn()
      const iframeMock = {
        iframe: {
          contentWindow: {
            location: {
              reload: iframeReloadSpy,
            },
          },
        },
      }

      it('should reload iframe', () => {
        jest
          .spyOn(require('../../utils/create-iframe/create-iframe'), 'createIframe')
          .mockImplementation(() => iframeMock)

        const widget = createWidget('url', { container })
        widget.refresh()
        jest.runAllTimers()
        expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
