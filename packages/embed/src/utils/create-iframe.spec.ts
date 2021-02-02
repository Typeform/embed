import { createIframe } from './create-iframe'
import * as build from './build-iframe-src'

describe('create-iframe', () => {
  describe('#createIframe', () => {
    let iframe: HTMLIFrameElement
    const buildIframeSrcMock = jest.spyOn(build, 'buildIframeSrc').mockImplementation(() => 'http://iframe-src/')
    const createElementMock = jest.spyOn(document, 'createElement')
    const options = {}

    beforeAll(() => {
      iframe = createIframe('url', 'fullpage', options)
    })

    it('should call buildIframeSrc', () => {
      expect(buildIframeSrcMock).toHaveBeenCalledWith('url', 'fullpage', options)
    })

    it('should create new iframe element', () => {
      expect(createElementMock).toHaveBeenCalledWith('iframe')
    })

    it('should set correct iframe src', () => {
      expect(iframe.src).toBe('http://iframe-src/')
    })
  })
})
