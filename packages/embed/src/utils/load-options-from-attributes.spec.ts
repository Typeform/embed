import {
  camelCaseToKebabCase,
  loadOptionsFromAttributes,
  transformAttributeValue,
} from './load-options-from-attributes'

describe('load-options-from-attributes', () => {
  describe('#camelCaseToKebabCase', () => {
    it('should convert camel case to kebab case', () => {
      expect(camelCaseToKebabCase('onceUponATimeInALandFarAway')).toBe('once-upon-a-time-in-a-land-far-away')
    })

    it('should convert upper camel case to kebab case', () => {
      expect(camelCaseToKebabCase('FooBarBaz')).toBe('foo-bar-baz')
    })
  })

  describe('#transformAttributeValue', () => {
    describe('to string', () => {
      it('should return string as string', () => {
        expect(transformAttributeValue('foobar', 'string')).toBe('foobar')
      })

      it('should transform null to undefined', () => {
        expect(transformAttributeValue(null, 'string')).toBe(undefined)
      })

      it('should transform undefined to undefined', () => {
        expect(transformAttributeValue(null, 'string')).toBe(undefined)
      })

      it('should return empty string as undefined', () => {
        expect(transformAttributeValue('', 'string')).toBe(undefined)
      })
    })

    describe('to boolean', () => {
      it('should transform "yes" to true', () => {
        expect(transformAttributeValue('yes', 'boolean')).toBe(true)
      })

      it('should transform "true" to true', () => {
        expect(transformAttributeValue('true', 'boolean')).toBe(true)
      })

      it('should transform empty string (attribute with no value) to true', () => {
        expect(transformAttributeValue('', 'boolean')).toBe(true)
      })

      const falseValues = ['no', 'foo', null]
      falseValues.forEach((value) => {
        it(`should transform "${value}" to false`, () => {
          expect(transformAttributeValue(value, 'boolean')).toBe(false)
        })
      })
    })

    describe('to integer', () => {
      it('should return numberic string as integer', () => {
        expect(transformAttributeValue('1', 'integer')).toBe(1)
      })

      it('should return string zero "0" as integer', () => {
        expect(transformAttributeValue('0', 'integer')).toBe(0)
      })

      it('should return negative numeric string as integer', () => {
        expect(transformAttributeValue('-1', 'integer')).toBe(-1)
      })

      it('should transform decimal numeric string to integer (drop the decimal part)', () => {
        expect(transformAttributeValue('1.999', 'integer')).toBe(1)
      })

      it('should transform non-numberic string "foo" to undefined', () => {
        expect(transformAttributeValue('foo', 'integer')).toBe(undefined)
      })

      it('should transform empty string (attribute with no value) to undefined', () => {
        expect(transformAttributeValue('', 'integer')).toBe(undefined)
      })
    })
  })

  describe('to array', () => {
    it('should transform string as array', () => {
      expect(transformAttributeValue('a, b', 'array')).toEqual(['a', 'b'])
    })

    it('should transform string with escaped commas as array', () => {
      expect(transformAttributeValue('a, b, c\\,d', 'array')).toEqual(['a', 'b', 'c,d'])
    })

    it('should remove empty spaces around text', () => {
      expect(transformAttributeValue('foo , bar , test', 'array')).toEqual(['foo', 'bar', 'test'])
    })

    it('should transform malformed string in empty array', () => {
      expect(transformAttributeValue(',', 'array')).toEqual([])
    })

    it('should return undefined if no value', () => {
      expect(transformAttributeValue('', 'array')).toEqual(undefined)
    })
  })

  describe('to record (object)', () => {
    it('should transform string as record', () => {
      expect(transformAttributeValue('a=aa, b=bb', 'record')).toEqual({ a: 'aa', b: 'bb' })
    })

    it('should transform string with escaped commas as record', () => {
      expect(transformAttributeValue('a=a\\,a, b\\,b=bb', 'record')).toEqual({ a: 'a,a', 'b,b': 'bb' })
    })

    it('should remove empty spaces in values, not around keys', () => {
      expect(transformAttributeValue('foo key=foo value , bar =bar value , test key = test=value ', 'record')).toEqual({
        'foo key': 'foo value ',
        bar: 'bar value ',
        'test key': ' test=value ',
      })
    })

    it('should transform malformed string in empty record', () => {
      expect(transformAttributeValue(',', 'record')).toEqual({})
    })

    it('should return undefined if no value', () => {
      expect(transformAttributeValue('', 'record')).toEqual(undefined)
    })
  })

  describe('to integerOrBoolean', () => {
    it('should return an integer if value is provided', () => {
      expect(transformAttributeValue('1000', 'integerOrBoolean')).toEqual(1000)
    })

    it('should return an integer if value is zero', () => {
      expect(transformAttributeValue('0', 'integerOrBoolean')).toEqual(0)
    })

    it('should return true if empty string is provided', () => {
      expect(transformAttributeValue('', 'integerOrBoolean')).toEqual(true)
    })

    it('should return false if no value is provided', () => {
      expect(transformAttributeValue(null, 'integerOrBoolean')).toEqual(false)
    })
  })

  describe('to stringOrBoolean', () => {
    it('should return a string if value is provided', () => {
      expect(transformAttributeValue('hello', 'stringOrBoolean')).toEqual('hello')
    })

    it('should return true if empty string is provided', () => {
      expect(transformAttributeValue('', 'integerOrBoolean')).toEqual(true)
    })

    it('should return false if no value is provided', () => {
      expect(transformAttributeValue(null, 'integerOrBoolean')).toEqual(false)
    })
  })

  describe('#loadOptionsFromAttributes', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div id="element"
        data-tf-string-param="foo"
        data-tf-empty-string-param
        data-tf-bool-param
        data-tf-bool-param-yes="yes"
      ></div>`

    it('should load correct options', () => {
      const options = loadOptionsFromAttributes(wrapper.querySelector('#element') as HTMLElement, {
        stringParam: 'string',
        emptyStringParam: 'string',
        nonExistantStringParam: 'string',
        boolParam: 'boolean',
        boolParamYes: 'boolean',
        nonExistantBoolParam: 'boolean',
      })
      expect(options).toEqual({
        stringParam: 'foo',
        boolParam: true,
        boolParamYes: true,
        nonExistantBoolParam: false,
      })
    })
  })
})
