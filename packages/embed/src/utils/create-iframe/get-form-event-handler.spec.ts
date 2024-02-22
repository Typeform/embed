import {
  getFormHeightChangedHandler,
  getFormQuestionChangedHandler,
  getFormReadyHandler,
  getFormSubmitHandler,
  getRedirectHandler,
  getThankYouScreenButtonClickHandler,
  getWelcomeScreenHiddenHandler,
} from './get-form-event-handler'

const handleFormRedirectSpy = jest.fn()

jest.mock('./handle-form-redirect', () => ({
  handleFormRedirect: () => handleFormRedirectSpy,
}))

describe('get-form-event-handler', () => {
  const embedId = 'foobar'
  const data = { foo: 'bar', bar: 'foo' }
  const spy = jest.fn()

  beforeEach(() => {
    spy.mockReset()
    handleFormRedirectSpy.mockReset()
  })

  describe('#getFormReadyHandler', () => {
    const handler = getFormReadyHandler(embedId, spy)

    it('should call the callback function', () => {
      handler({ data: { type: 'form-ready', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(data)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'form-ready', embedId: 'other', ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-submit', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('#getFormQuestionChangedHandler', () => {
    const handler = getFormQuestionChangedHandler(embedId, spy)

    it('should call the callback function', () => {
      handler({ data: { type: 'form-screen-changed', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(data)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'form-screen-changed', embedId: 'other', ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-submit', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('#getFormHeightChangedHandler', () => {
    const handler = getFormHeightChangedHandler(embedId, spy)

    it('should call the callback function', () => {
      handler({ data: { type: 'form-height-changed', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(data)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'form-height-changed', embedId: 'other', ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-screen-changed', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('#getFormSubmitHandler', () => {
    const handler = getFormSubmitHandler(embedId, spy)

    it('should call the callback function', () => {
      handler({ data: { type: 'form-submit', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(data)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'form-submit', embedId: 'other', ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-ready', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('#getWelcomeScreenHiddenHandler', () => {
    const handler = getWelcomeScreenHiddenHandler(embedId, spy)

    it('should call the callback function', () => {
      handler({ data: { type: 'welcome-screen-hidden', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(data)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'welcome-screen-hidden', embedId: 'other', ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-ready', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('#getThankYouScreenButtonClickHandler', () => {
    const handler = getThankYouScreenButtonClickHandler(embedId, spy)

    it('should call the callback function', () => {
      handler({ data: { type: 'thank-you-screen-button-click', embedId } })
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'welcome-screen-hidden', embedId: 'other', ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-ready', embedId, ...data } })
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('#getRedirectHandler', () => {
    const iframe = document.createElement('iframe') as HTMLIFrameElement
    const handler = getRedirectHandler(embedId, iframe)

    it('should call the callback function', () => {
      handler({ data: { type: 'redirect-after-submit', embedId } })
      handler({ data: { type: 'thank-you-screen-redirect', embedId } })
      expect(handleFormRedirectSpy).toHaveBeenCalledTimes(2)
    })

    it('should not call the callback function for mismatched embed id', () => {
      handler({ data: { type: 'welcome-screen-hidden', embedId: 'other', ...data } })
      expect(handleFormRedirectSpy).toHaveBeenCalledTimes(0)
    })

    it('should not call the callback function for different event type', () => {
      handler({ data: { type: 'form-ready', embedId, ...data } })
      expect(handleFormRedirectSpy).toHaveBeenCalledTimes(0)
    })
  })
})
