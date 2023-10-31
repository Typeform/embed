import { getValueWithUnits, setElementSize } from './set-element-size'

describe('set-element-size', () => {
  describe('#setElementSize', () => {
    it('should return an element with width', () => {
      const element = document.createElement('div')
      const sizedElement = setElementSize(element, { width: 100 })
      expect(sizedElement).toHaveStyle('width: 100px')
      expect(sizedElement).not.toHaveStyle('height: 100px')
    })

    it('should return an element with height', () => {
      const element = document.createElement('div')
      const sizedElement = setElementSize(element, { height: 100 })
      expect(sizedElement).toHaveStyle('height: 100px')
      expect(sizedElement).not.toHaveStyle('width: 100px')
    })

    it('should return an element with width and height', () => {
      const element = document.createElement('div')
      expect(setElementSize(element, { width: 100, height: '100' })).toHaveStyle({
        width: '100px',
        height: '100px',
      })
    })

    it('should return same element if no params', () => {
      const element = document.createElement('div')
      const newElement = setElementSize(element, { width: undefined, height: undefined })
      expect(newElement).toBe(element)
    })

    it('should set element width and height with different units', () => {
      const element = document.createElement('div')
      const sizedElement = setElementSize(element, { width: '100%', height: '50vh' })
      expect(sizedElement).toHaveStyle('width: 100%')
      expect(sizedElement).toHaveStyle('height: 50vh')
    })
  })

  describe('#getValueWithUnits', () => {
    it('should return size in pixels for number value', () => {
      expect(getValueWithUnits(100)).toBe('100px')
    })

    it('should return size in pixels for string value containing only numbers', () => {
      expect(getValueWithUnits('100')).toBe('100px')
    })

    it('should keep original units when provided in the value', () => {
      expect(getValueWithUnits('100vh')).toBe('100vh')
    })
  })
})
