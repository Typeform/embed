import { fireEvent } from '@testing-library/dom'

import { createIframe } from './create-iframe'

jest.mock('./generate-embed-id', () => ({ generateEmbedId: () => 'random-id' }))

describe('create-iframe', () => {
  describe('#createIframe', () => {
    let iframe = null as any

    const buildIframeSrcMock = jest
      .spyOn(require('./../build-iframe-src'), 'buildIframeSrc')
      .mockImplementation(() => 'http://iframe-src/')
    const createElementMock = jest.spyOn(document, 'createElement')
    const triggerIframeRedrawMock = jest.spyOn(require('./trigger-iframe-redraw'), 'triggerIframeRedraw')
    const options = { onReady: jest.fn(), onSubmit: jest.fn(), onQuestionChanged: jest.fn() }

    beforeEach(() => {
      iframe = createIframe('form-id', 'widget', options).iframe
    })

    it('should call buildIframeSrc', () => {
      expect(buildIframeSrcMock).toHaveBeenCalledTimes(1)
      expect(buildIframeSrcMock).toHaveBeenCalledWith({
        embedId: 'random-id',
        formId: 'form-id',
        options,
        type: 'widget',
      })
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

    it('should call form-ready handler', async () => {
      window.postMessage({ type: 'form-ready', embedId: 'random-id' }, '*')
      await new Promise((resolve) => setTimeout(resolve))

      expect(options.onReady).toBeCalled()
    })

    it('should call form-screen-changed handler', async () => {
      window.postMessage({ type: 'form-screen-changed', embedId: 'random-id' }, '*')
      await new Promise((resolve) => setTimeout(resolve))

      expect(options.onQuestionChanged).toBeCalled()
    })

    it('should call form-submit handler', async () => {
      window.postMessage({ type: 'form-submit', responseId: 'test-response-id', embedId: 'random-id' }, '*')
      await new Promise((resolve) => setTimeout(resolve))

      expect(options.onSubmit).toBeCalledWith({ responseId: 'test-response-id' })
    })
  })
})
