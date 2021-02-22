import { fireEvent } from '@testing-library/dom'

import { EmbedType } from '../../base'

import { createIframe } from './create-iframe'

describe('create-iframe', () => {
  describe('#createIframe', () => {
    let iframe: HTMLIFrameElement
    const buildIframeSrcMock = jest
      .spyOn(require('./../build-iframe-src'), 'buildIframeSrc')
      .mockImplementation(() => 'http://iframe-src/')
    const createElementMock = jest.spyOn(document, 'createElement')
    const triggerIframeRedrawMock = jest.spyOn(require('./trigger-iframe-redraw'), 'triggerIframeRedraw')
    const options = {}

    beforeEach(() => {
      iframe = createIframe('form-id', EmbedType.Widget, options)
    })

    it('should call buildIframeSrc', () => {
      expect(buildIframeSrcMock).toHaveBeenCalledWith('form-id', 'widget', options)
    })

    it('should create new iframe element', () => {
      expect(createElementMock).toHaveBeenCalledWith('iframe')
    })

    it('should set correct iframe src', () => {
      expect(iframe.src).toBe('http://iframe-src/')
    })

    it('tell browser to redraw the iframe after the load', () => {
      expect.assertions(1)

      fireEvent(iframe, new Event('load'))

      expect(triggerIframeRedrawMock).toHaveBeenCalled()
    })
  })
})
