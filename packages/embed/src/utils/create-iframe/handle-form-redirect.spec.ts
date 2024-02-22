import { handleFormRedirect } from './handle-form-redirect'

describe('#handleFormRedirect', () => {
  const iframe = document.createElement('iframe') as HTMLIFrameElement
  const url = 'http://my/redirect/url'
  const windowOpenSpy = jest.spyOn(window, 'open')
  const consoleErrorSpy = jest.spyOn(console, 'error')

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost',
      },
      writable: true,
    })
    windowOpenSpy.mockClear()
    consoleErrorSpy.mockClear()
  })

  describe('with no target specified', () => {
    it('should redirect in current window by default', () => {
      handleFormRedirect(iframe)({ url })
      expect(window.location.href).toBe(url)
    })
  })

  describe('with target "_parent"', () => {
    it('should redirect in current window with target "_parent"', () => {
      handleFormRedirect(iframe)({ url, target: '_parent' })
      expect(window.location.href).toBe(url)
    })
  })

  describe('with target "_self"', () => {
    it('should redirect in the iframe ', () => {
      handleFormRedirect(iframe)({ url, target: '_self' })
      expect(iframe.src).toBe(url)
    })

    describe('when URL contains a hash fragment', () => {
      it('should add Date.now() to the URL when it is the same form URL', () => {
        const iframe = document.createElement('iframe') as HTMLIFrameElement
        iframe.src = 'http://my/form'
        handleFormRedirect(iframe)({ url: 'http://my/form#foo', target: '_self' })
        expect(iframe.src).toMatch(/http:\/\/my\/form\?tf-embed-ts=[0-9]+#foo/)
      })

      it('should not add Date.now() to the URL is different', () => {
        const iframe = document.createElement('iframe') as HTMLIFrameElement
        iframe.src = 'http://my/form'
        handleFormRedirect(iframe)({ url: 'http://different/form#foo', target: '_self' })
        expect(iframe.src).toBe('http://different/form#foo')
      })
    })
  })

  describe('with target "_blank"', () => {
    it('should redirect in new tab', () => {
      handleFormRedirect(iframe)({ url, target: '_blank' })
      expect(window.open).toHaveBeenCalledTimes(1)
      expect(window.open).toHaveBeenCalledWith(url, '_blank')
    })
  })

  describe('with target "_top"', () => {
    it('should redirect in top window ', () => {
      handleFormRedirect(iframe)({ url, target: '_parent' })
      expect(window.location.href).toBe(url)
    })
  })

  describe('with no URL', () => {
    it('should not redirect and log error', () => {
      handleFormRedirect(iframe)({} as unknown as { url: string })
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(window.location.href).toBe('http://localhost')
    })
  })
})
