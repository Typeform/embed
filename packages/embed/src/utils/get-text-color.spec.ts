import { getTextColor } from './get-text-color'

describe('#getTextColor', () => {
  it('Renders the correct rgb values if an Hex value is passed', () => {
    expect(getTextColor('#000')).toEqual('#FFFFFF')
  })

  it('Renders the correct rgb values if an RGB value is passed', () => {
    expect(getTextColor('rgb(0, 0, 0)')).toEqual('#FFFFFF')
  })

  it('Renders the correct rgb values if an RGB with alpha value is passed', () => {
    expect(getTextColor('rgba(0, 0, 0, 2)')).toEqual('#FFFFFF')
  })
})
