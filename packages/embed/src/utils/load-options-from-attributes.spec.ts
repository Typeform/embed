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

    describe('to booolean', () => {
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
