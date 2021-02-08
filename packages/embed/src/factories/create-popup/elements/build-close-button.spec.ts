import { buildCloseButton } from './build-close-button'

describe('build-close-button', () => {
  describe('#buildCloseButton', () => {
    const closeSpy = jest.fn()
    const button = buildCloseButton(closeSpy())

    it('should render close button', () => {
      expect(button.className).toBe('typeform-close')
      expect(button.innerHTML).toBe('×')
    })

    it('should call close callback on click', () => {
      button.click()
      expect(closeSpy).toHaveBeenCalledTimes(1)
    })
  })
})
