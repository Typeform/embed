import { hexRgb } from './hex-rgb'

describe('#hexRGB', () => {
  it('Returns the correct rgb values for 6 digits hex', () => {
    expect(hexRgb('#000000')).toEqual({
      red: 0,
      green: 0,
      blue: 0,
    })
  })
  it('Returns the correct rgb values 3 digits hex', () => {
    expect(hexRgb('#000')).toEqual({
      red: 0,
      green: 0,
      blue: 0,
    })
  })
})
