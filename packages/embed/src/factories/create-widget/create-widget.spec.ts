import { createWidget, Widget } from './create-widget'

describe('create-widget', () => {
  describe('#createWidget', () => {
    let widget: Widget
    const container = document.createElement('div')
    const containerAppendMock = jest.spyOn(container, 'append')
    const widgetMock = document.createElement('div')

    jest.spyOn(require('./elements/build-widget'), 'buildWidget').mockImplementation(() => widgetMock)

    beforeAll(() => {
      widget = createWidget('url', { container })
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
        contentWindow: {
          location: {
            reload: iframeReloadSpy,
          },
        },
      }

      jest
        .spyOn(require('../../utils/create-iframe/create-iframe'), 'createIframe')
        .mockImplementation(() => iframeMock)

      it('should reload iframe', () => {
        widget.refresh()
        expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
