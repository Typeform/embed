import { getTextColor } from './get-text-color'

describe('#getTextColor', () => {
  describe('for light colors', () => {
    it.each(['#ffffff', '#ff0', '#faa', '#ccf', 'rgb(200, 200, 200)'])('returns black color for %s color', (input) => {
      expect(getTextColor(input)).toEqual('#000000')
    })
  })

  describe('for dark colors', () => {
    it.each(['#000', '#0f0', '#0a0', '#a40000', 'rgba(0, 0, 0, 2)'])('returns white color for %s color', (input) => {
      expect(getTextColor(input)).toEqual('#FFFFFF')
    })
  })
})
