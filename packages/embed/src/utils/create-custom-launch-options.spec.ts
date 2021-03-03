import { handleCustomOpen } from './create-custom-launch-options'

describe('handleCustomOpen', () => {
  const mockOpen = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on load', () => {
    beforeAll(() => {
      handleCustomOpen(mockOpen, 'load')
    })

    it('should open the popup', () => {
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })
  })

  describe('on exit', () => {
    let handler: any

    beforeAll(() => {
      jest.spyOn(document, 'addEventListener').mockImplementation((_event, fn) => {
        handler = fn // retrieve the auto-open handler method for testing
      })
      jest.spyOn(document, 'removeEventListener')
    })

    it('should not open the popup when mouse moves outside the threshold', () => {
      handleCustomOpen(mockOpen, 'exit', 50)
      handler({ clientY: 105 })
      handler({ clientY: 110 })
      handler({ clientY: 115 })
      handler({ clientY: 110 })
      handler({ clientY: 105 })
      expect(mockOpen).toHaveBeenCalledTimes(0)
      expect(document.removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should not open the popup when mouse moves down', () => {
      handleCustomOpen(mockOpen, 'exit', 50)
      handler({ clientY: 5 })
      handler({ clientY: 10 })
      handler({ clientY: 11 })
      handler({ clientY: 12 })
      expect(mockOpen).toHaveBeenCalledTimes(0)
      expect(document.removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should open the popup (and remove event listener) when mouse moves up', () => {
      handleCustomOpen(mockOpen, 'exit', 50)
      handler({ clientY: 10 })
      handler({ clientY: 8 })
      expect(mockOpen).toHaveBeenCalledTimes(1)
      expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('on time', () => {
    beforeAll(() => {
      jest.useFakeTimers()
      handleCustomOpen(mockOpen, 'time', 5000)
    })

    it('should not open the popup right away', () => {
      expect(mockOpen).toHaveBeenCalledTimes(0)
    })

    it('should open the popup after the time has passed', () => {
      jest.runAllTimers()
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })
  })

  describe('on scroll', () => {
    let handler: any
    const win = window as any // Avoid to set any time window as any
    beforeAll(() => {
      jest.spyOn(document, 'addEventListener').mockImplementation((_event, fn) => {
        handler = fn // retrieve the auto-open handler method for testing
      })
      jest.spyOn(document, 'removeEventListener')
      win.pageYOffset = 0
      win.innerHeight = 500
      Object.defineProperty(window.HTMLHtmlElement.prototype, 'scrollHeight', { value: 1000 })
    })

    it('should not open the popup when the page has not scrolled past the threshold', () => {
      handleCustomOpen(mockOpen, 'scroll', 30)

      win.pageYOffset = 0
      handler()

      win.pageYOffset = 100
      handler()

      win.pageYOffset = 299
      handler()

      expect(mockOpen).toHaveBeenCalledTimes(0)
      expect(document.removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should open the popup when the page has scrolled past the threshold', () => {
      handleCustomOpen(mockOpen, 'scroll', 30)
      win.pageYOffset = 300
      handler()
      expect(mockOpen).toHaveBeenCalledTimes(1)
      expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    })

    it('should open the popup when the page is scrolled at the end and threshold is beyond the end', () => {
      handleCustomOpen(mockOpen, 'scroll', 90)
      win.pageYOffset = 500
      handler()
      expect(mockOpen).toHaveBeenCalledTimes(1)
      expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('on unknown value', () => {
    beforeAll(() => {
      handleCustomOpen(mockOpen, 'unknown')
    })

    it('should not open the popup', () => {
      expect(mockOpen).toHaveBeenCalledTimes(0)
    })
  })
})
