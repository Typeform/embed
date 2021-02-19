import { objectToQueryString } from './object-to-query-string'

describe('object-to-query-string', () => {
  describe('#objectToQueryString', () => {
    it('should convert object to query string', () => {
      expect(objectToQueryString({ foo: 'foobar', bar: 'barfoo' })).toEqual('foo=foobar&bar=barfoo')
    })

    it('should omit undefined or null values', () => {
      expect(objectToQueryString({ foo: 'bar', bar: null, baz: undefined })).toEqual('foo=bar')
    })

    it('should not omit zero values', () => {
      expect(objectToQueryString({ foo: 1, bar: 0 })).toEqual('foo=1&bar=0')
    })

    it('should encode keys and values', () => {
      expect(objectToQueryString({ 'a=b': 'c d', e: 'g&h', i: 'j?k' })).toEqual('a%3Db=c%20d&e=g%26h&i=j%3Fk')
    })
  })
})
