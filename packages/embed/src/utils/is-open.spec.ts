import { isInPage, isOpen, isVisible } from './is-open'

describe('is-open', () => {
  const makeFakeElement = (parentNode: any, display?: string) =>
    ({
      parentNode,
      style: {
        display,
      },
    } as HTMLElement)

  describe('#isOpen', () => {
    it('should return true when element is in page and visible', () => {
      expect(isOpen(makeFakeElement({}, 'inline-block'))).toBe(true)
    })

    it('should return false when element is not page', () => {
      expect(isOpen(makeFakeElement(undefined, 'inline-block'))).toBe(false)
    })

    it('should return false when element is not visible', () => {
      expect(isOpen(makeFakeElement({}, 'none'))).toBe(false)
    })
  })

  describe('#isInPage', () => {
    it('should return true when element is in page', () => {
      expect(isInPage(makeFakeElement({}))).toBe(true)
    })

    it('should return true when element is not page', () => {
      expect(isInPage(makeFakeElement(undefined))).toBe(false)
    })
  })

  describe('#isVisible', () => {
    it('should return true when element is visible', () => {
      expect(isVisible(makeFakeElement({}, 'flex'))).toBe(true)
    })

    it('should return true when element is not visible', () => {
      expect(isVisible(makeFakeElement({}, 'none'))).toBe(false)
    })
  })
})
