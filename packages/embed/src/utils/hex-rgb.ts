/**
 * @copyright @sindresorhus
 * @Github https://github.com/sindresorhus/hex-rgb
 * @NPM: https://www.npmjs.com/package/hex-rgb
 */

const hexCharacters = 'a-f\\d'
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi')
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i')

export const hexRgb = (hex: string): { red: number; green: number; blue: number } => {
  if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
    throw new TypeError('Expected a valid hex string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 8) {
    hex = hex.slice(0, 6)
  }

  if (hex.length === 4) {
    hex = hex.slice(0, 3)
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const number = Number.parseInt(hex, 16)
  const red = number >> 16
  const green = (number >> 8) & 255
  const blue = number & 255

  return { red, green, blue }
}
