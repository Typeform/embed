import { removeUndefinedKeys } from './remove-undefined-keys'

describe('remove-undefined-keys', () => {
  describe('#removeUndefinedKeys', () => {
    it('should remove undefined and null keys', () => {
      expect(removeUndefinedKeys({ a: 'foobar', b: 0, c: '', d: undefined, e: null })).toEqual({
        a: 'foobar',
        b: 0,
        c: '',
      })
    })
  })
})
