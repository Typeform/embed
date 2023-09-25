import { DEFAULT_AUTO_CLOSE_TIME, setAutoClose } from './set-auto-close'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('set-auto-close', () => {
  describe('#setAutoClose', () => {
    it('should listen to submit event', async () => {
      const embedId = '123'
      const autoClose = 1500
      const cb = jest.fn()

      setAutoClose(embedId, autoClose, cb)

      window.postMessage({ type: 'form-submit', embedId }, '*')

      await wait(autoClose + 100)

      expect(cb).toHaveBeenCalled()
    })

    it('should trigger autoClose with default minimal delay', async () => {
      const embedId = '123'
      const autoClose = true
      const cb = jest.fn()

      setAutoClose(embedId, autoClose, cb)

      window.postMessage({ type: 'form-submit', embedId }, '*')

      await wait(DEFAULT_AUTO_CLOSE_TIME + 100)

      expect(cb).toHaveBeenCalled()
    })

    it('should not trigger the callback if no autoClose', async () => {
      const embedId = '123'
      const cb = jest.fn()

      setAutoClose(embedId, undefined, cb)

      window.postMessage({ type: 'form-submit', embedId }, '*')

      await new Promise((resolve) => setTimeout(resolve, 200))

      expect(cb).not.toHaveBeenCalled()
    })
  })
})
