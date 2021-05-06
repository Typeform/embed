import { setElementSize } from './set-element-size'

describe('set-element-size', () => {
  describe('#setElementSize', () => {
    it('should return an element with width', () => {
      const element = document.createElement('div')
      expect(setElementSize(element, { width: 100 })).toHaveStyle('width: 100px')
      expect(setElementSize(element, { width: 100 })).not.toHaveStyle('height: 100px')
    })

    it('should return an element with height', () => {
      const element = document.createElement('div')
      expect(setElementSize(element, { height: 100 })).toHaveStyle('height: 100px')
      expect(setElementSize(element, { height: 100 })).not.toHaveStyle('width: 100px')
    })

    it('should return an element with width and height', () => {
      const element = document.createElement('div')
      expect(setElementSize(element, { width: 100, height: 100 })).toHaveStyle({
        width: '100px',
        height: '100px',
      })
    })

    it('should return same element if no params', () => {
      const element = document.createElement('div')
      const newElement = setElementSize(element, { width: undefined, height: undefined })
      expect(newElement).toBe(element)
    })
  })
})
