import { mergeOptions } from './merge-options'

describe('merge-options', () => {
  describe('#mergeOptions', () => {
    it('should merge options', () => {
      const optionsA = {
        a: true,
        b: {
          b1: 'foo',
          b2: 'bar',
        },
        c: 'foo',
        d: 42,
      }

      const optionsB = {
        b: {
          b2: 'baz',
          b3: 'new',
        },
        c: false,
        d: undefined,
        e: 'foo',
      }

      expect(mergeOptions(optionsA, optionsB)).toEqual({
        a: true,
        b: {
          b1: 'foo',
          b2: 'baz',
          b3: 'new',
        },
        c: false,
        d: 42,
        e: 'foo',
      })
    })
  })
})
