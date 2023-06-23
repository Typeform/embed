import { isInPage, isOpen, isVisible } from './is-open'

describe('is-open', () => {
  const emptyParentNode = {} as ParentNode

  const makeFakeElement = (parentNode: ParentNode | null, display?: string) =>
    ({
      parentNode,
      style: {
        display,
      },
    } as HTMLElement)

  describe('#isOpen', () => {
    it('should return true when element is in page and visible', () => {
      expect(isOpen(makeFakeElement(emptyParentNode, 'inline-block'))).toBe(true)
    })

    it('should return false when element is not page', () => {
      expect(isOpen(makeFakeElement(null, 'inline-block'))).toBe(false)
    })

    it('should return false when element is not visible', () => {
      expect(isOpen(makeFakeElement(emptyParentNode, 'none'))).toBe(false)
    })
  })

  describe('#isInPage', () => {
    it('should return true when element is in page', () => {
      expect(isInPage(makeFakeElement(emptyParentNode))).toBe(true)
    })

    it('should return true when element is not page', () => {
      expect(isInPage(makeFakeElement(null))).toBe(false)
    })
  })

  describe('#isVisible', () => {
    it('should return true when element is visible', () => {
      expect(isVisible(makeFakeElement(emptyParentNode, 'flex'))).toBe(true)
    })

    it('should return true when element is not visible', () => {
      expect(isVisible(makeFakeElement(emptyParentNode, 'none'))).toBe(false)
    })
  })
})
