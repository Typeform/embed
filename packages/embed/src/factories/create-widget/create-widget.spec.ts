import { EmbedRefreshable } from '../../base'

import { createWidget } from './create-widget'

describe('create-widget', () => {
  describe('#createWidget', () => {
    let widget: EmbedRefreshable
    const element = document.createElement('div')
    const containerAppendMock = jest.spyOn(element, 'append')
    const widgetMock = document.createElement('div')

    jest.spyOn(require('../create-embed/elements/build-embed'), 'buildEmbed').mockImplementation(() => widgetMock)

    beforeAll(() => {
      widget = createWidget('url', { element })
    })

    it('should append widget to the container', () => {
      expect(containerAppendMock).toHaveBeenCalledTimes(1)
      expect(containerAppendMock).toHaveBeenCalledWith(widgetMock)
    })

    it('should render widget in container', () => {
      expect(widgetMock.parentNode).toBe(element)
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
