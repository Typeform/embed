import { isDefined } from './is-defined'

describe('is-defined', () => {
  describe('#isDefined', () => {
    describe('for undefined values', () => {
      const scenarios = [undefined, null]

      scenarios.forEach((value) => {
        it(`should return false for "${value}"`, () => {
          expect(isDefined(value)).toBe(false)
        })
      })
    })

    describe('for defined values', () => {
      const scenarios = ['', 'foo', 0, -1, 10, {}, [], () => null]

      scenarios.forEach((value) => {
        it(`should return true for "${value}"`, () => {
          expect(isDefined(value)).toBe(true)
        })
      })
    })
  })
})
