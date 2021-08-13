import { hexRgb } from './hex-rgb'

// https://www.w3.org/TR/AERT/#color-contrast
const RED_BRIGHTNESS = 299
const GREEN_BRIGHTNESS = 587
const BLUE_BRIGHTNESS = 114
const BASE = 1000
const BRIGHTNETSS_LIMIT = 125

const isHex = (string: string) => string.startsWith('#')

const getRgbValues = (rgb: string) => {
  const rgbValues = {
    red: 0,
    green: 0,
    blue: 0,
  }

  const values = rgb.match(/\d+/g)

  if (values) {
    rgbValues.red = parseInt(values[0], 10)
    rgbValues.green = parseInt(values[0], 10)
    rgbValues.blue = parseInt(values[0], 10)
  }

  return rgbValues
}

export const getTextColor = (color?: string): string => {
  // return default color
  if (!color) return '#FFFFFF'

  const rgbValues = isHex(color) ? hexRgb(color) : getRgbValues(color)

  const { red, green, blue } = rgbValues

  const brightness = Math.round((red * RED_BRIGHTNESS + green * GREEN_BRIGHTNESS + blue * BLUE_BRIGHTNESS) / BASE)

  return brightness > BRIGHTNETSS_LIMIT ? '#000000' : '#FFFFFF'
}
