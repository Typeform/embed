import { changeColorOpacity } from './change-color-opacity'

describe('#changeColorOpacity', () => {
  it('should change opacity to 255 by default', () => {
    expect(changeColorOpacity('rgba(255, 125, 0, 0)')).toBe('rgba(255, 125, 0, 255)')
  })

  it('should change opacity to specified value', () => {
    expect(changeColorOpacity('rgba(255, 125, 0, 50)', 25)).toBe('rgba(255, 125, 0, 25)')
  })

  it('should change decimal opacity to specified value', () => {
    expect(changeColorOpacity('rgba(255, 125, 0, 0.5)', 125)).toBe('rgba(255, 125, 0, 125)')
    expect(changeColorOpacity('rgba(255, 125, 0, .250)', 125)).toBe('rgba(255, 125, 0, 125)')
  })

  it('should not change opacity for color without opacity', () => {
    expect(changeColorOpacity('rgb(255, 125, 0)', 25)).toBe('rgb(255, 125, 0)')
    expect(changeColorOpacity('#ff0000', 25)).toBe('#ff0000')
  })
})
