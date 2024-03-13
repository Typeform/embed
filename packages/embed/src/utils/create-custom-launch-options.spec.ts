import { BehavioralType } from '../base'

import { handleCustomOpen } from './create-custom-launch-options'

describe('handleCustomOpen', () => {
  const mockOpen = jest.fn()
  const formIdMock = 'aFormId'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('on load', () => {
    it('should open the popup', () => {
      handleCustomOpen(mockOpen, { open: 'load' }, formIdMock)
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })
  })

  describe('on exit', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let handler: any

    beforeAll(() => {
      jest.spyOn(document, 'addEventListener').mockImplementation((_event, fn) => {
        handler = fn // retrieve the auto-open handler method for testing
      })
      jest.spyOn(document, 'removeEventListener')
    })

    it('should not open the popup when mouse moves outside the threshold', () => {
      handleCustomOpen(mockOpen, { open: 'exit', openValue: 50 }, formIdMock)
      handler({ clientY: 105 })
      handler({ clientY: 110 })
      handler({ clientY: 115 })
      handler({ clientY: 110 })
      handler({ clientY: 105 })
      expect(mockOpen).toHaveBeenCalledTimes(0)
      expect(document.removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should not open the popup when mouse moves down', () => {
      handleCustomOpen(mockOpen, { open: 'exit', openValue: 50 }, formIdMock)
      handler({ clientY: 5 })
      handler({ clientY: 10 })
      handler({ clientY: 11 })
      handler({ clientY: 12 })
      expect(mockOpen).toHaveBeenCalledTimes(0)
      expect(document.removeEventListener).toHaveBeenCalledTimes(0)
    })

    it('should open the popup (and remove event listener) when mouse moves up', () => {
      handleCustomOpen(mockOpen, { open: 'exit', openValue: 50 }, formIdMock)
      handler({ clientY: 10 })
      handler({ clientY: 8 })
      expect(mockOpen).toHaveBeenCalledTimes(1)
      expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('on time', () => {
    beforeAll(() => {
      jest.useFakeTimers()
      handleCustomOpen(mockOpen, { open: 'time', openValue: 5000 }, formIdMock)
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let handler: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      handleCustomOpen(mockOpen, { open: 'scroll', openValue: 30 }, formIdMock)

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
      handleCustomOpen(mockOpen, { open: 'scroll', openValue: 30 }, formIdMock)
      win.pageYOffset = 300
      handler()
      expect(mockOpen).toHaveBeenCalledTimes(1)
      expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    })

    it('should open the popup when the page is scrolled at the end and threshold is beyond the end', () => {
      handleCustomOpen(mockOpen, { open: 'scroll', openValue: 90 }, formIdMock)
      win.pageYOffset = 500
      handler()
      expect(mockOpen).toHaveBeenCalledTimes(1)
      expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    })
  })

  describe('on unknown value', () => {
    beforeAll(() => {
      handleCustomOpen(mockOpen, { open: 'unknown' as BehavioralType }, formIdMock)
    })

    it('should not open the popup', () => {
      expect(mockOpen).toHaveBeenCalledTimes(0)
    })
  })

  describe('when preventOpenOnClose is enabled', () => {
    it('should open the popup', () => {
      document.cookie = `tf-${formIdMock}-closed=false;Path=/`
      handleCustomOpen(mockOpen, { open: 'load', preventReopenOnClose: true }, formIdMock)
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })

    it('should NOT open the popup', async () => {
      document.cookie = `tf-${formIdMock}-closed=true;Path=/`

      handleCustomOpen(mockOpen, { open: 'load', preventReopenOnClose: true }, formIdMock)
      expect(mockOpen).not.toHaveBeenCalled()
    })
  })

  describe('when respectOpenModals is "all"', () => {
    it('should open the modal when another modal is not open', () => {
      handleCustomOpen(mockOpen, { open: 'load', respectOpenModals: 'all' }, formIdMock)
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })

    it('should NOT open the modal when another modal is already open', () => {
      jest.spyOn(document, 'querySelector').mockReturnValue({ offsetHeight: 100 } as HTMLDivElement)
      handleCustomOpen(mockOpen, { open: 'load', respectOpenModals: 'all' }, formIdMock)
      expect(mockOpen).not.toHaveBeenCalled()
    })
  })

  describe('when respectOpenModals is "same"', () => {
    it('should open the modal when another modal is NOT open', () => {
      handleCustomOpen(mockOpen, { open: 'load', respectOpenModals: 'same' }, formIdMock)
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })

    it('should open the modal when another modal is already open with DIFFERENT form', () => {
      jest.spyOn(document, 'querySelector').mockReturnValue({ offsetHeight: 100 } as HTMLDivElement)
      handleCustomOpen(mockOpen, { open: 'load', respectOpenModals: 'same' }, formIdMock)
      expect(mockOpen).toHaveBeenCalledTimes(1)
    })

    it('should NOT open the modal when another modal is already open with THE SAME form', () => {
      document.body.innerHTML += `<div class="tf-v1-popup"><iframe src="typeform.com/to/${formIdMock}" /></div>`
      handleCustomOpen(mockOpen, { open: 'load', respectOpenModals: 'same' }, formIdMock)
      expect(mockOpen).not.toHaveBeenCalled()
    })
  })
})
