import { handleAutoOpen } from './popup-auto-open'

describe('handleAutoOpen', () => {
  const mockPopup = {
    open: jest.fn(),
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on load', () => {
    beforeAll(() => {
      handleAutoOpen(mockPopup, 'load')
    })

    it('should open the popup', () => {
      expect(mockPopup.open).toHaveBeenCalledTimes(1)
    })
  })

  describe('on exit', () => {
    const removeEventListener = jest.fn()
    let handler

    beforeAll(() => {
      global.document = {
        addEventListener: (_event, fn) => {
          handler = fn
        },
        removeEventListener,
      }
    })

    afterAll(() => {
      delete global.document
    })

    it('should not open the popup when mouse moves outside the threshold', () => {
      handleAutoOpen(mockPopup, 'exit', 50)
      handler({ clientY: 105 })
      handler({ clientY: 110 })
      handler({ clientY: 115 })
      handler({ clientY: 110 })
      handler({ clientY: 105 })
      expect(mockPopup.open).toHaveBeenCalledTimes(0)
      expect(removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should not open the popup when mouse moves down', () => {
      handleAutoOpen(mockPopup, 'exit', 50)
      handler({ clientY: 5 })
      handler({ clientY: 10 })
      handler({ clientY: 11 })
      handler({ clientY: 12 })
      expect(mockPopup.open).toHaveBeenCalledTimes(0)
      expect(removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should open the popup (and remove event listener) when mouse moves up', () => {
      handleAutoOpen(mockPopup, 'exit', 50)
      handler({ clientY: 10 })
      handler({ clientY: 8 })
      expect(mockPopup.open).toHaveBeenCalledTimes(1)
      expect(removeEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('on time', () => {
    beforeAll(() => {
      jest.useFakeTimers()
      handleAutoOpen(mockPopup, 'time', 5000)
    })

    it('should not open the popup right away', () => {
      expect(mockPopup.open).toHaveBeenCalledTimes(0)
    })

    it('should open the popup after the time has passed', () => {
      jest.runAllTimers()
      expect(mockPopup.open).toHaveBeenCalledTimes(1)
    })
  })

  describe('on scroll', () => {
    const removeEventListener = jest.fn()
    let handler

    beforeAll(() => {
      global.document = {
        documentElement: {
          scrollHeight: 1000,
        },
        addEventListener: (_event, fn) => {
          handler = fn
        },
        removeEventListener,
      }
      global.window = {
        pageYOffset: 0,
        innerHeight: 500,
      }
    })

    afterAll(() => {
      delete global.document
      delete global.window
    })

    it('should not open the popup when the page has not scrolled past the threshold', () => {
      handleAutoOpen(mockPopup, 'scroll', 30)

      global.window.pageYOffset = 0
      handler()

      global.window.pageYOffset = 100
      handler()

      global.window.pageYOffset = 299
      handler()

      expect(mockPopup.open).toHaveBeenCalledTimes(0)
      expect(removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should open the popup when the page has scrolled past the threshold', () => {
      handleAutoOpen(mockPopup, 'scroll', 30)
      global.window.pageYOffset = 300
      handler()
      expect(mockPopup.open).toHaveBeenCalledTimes(1)
      expect(removeEventListener).toHaveBeenCalledTimes(1)
    })

    it('should open the popup when the page is scrolled at the end and threshold is beyond the end', () => {
      handleAutoOpen(mockPopup, 'scroll', 90)
      global.window.pageYOffset = 500
      handler()
      expect(mockPopup.open).toHaveBeenCalledTimes(1)
      expect(removeEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('on unknown value', () => {
    beforeAll(() => {
      handleAutoOpen(mockPopup, 'unknown')
    })

    it('should not open the popup', () => {
      expect(mockPopup.open).toHaveBeenCalledTimes(0)
    })
  })
})
