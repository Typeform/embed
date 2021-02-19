import { buildOptionsFromAttributes } from './build-options-from-attributes'

describe('build-options-from-attributes', () => {
  describe('#buildOptionsFromAttributes', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<div id="element"
        data-tf-source="unit-test-source"
        data-tf-medium="unit-test-medium"
        data-tf-medium-version="unit-test-version"
        data-tf-hide-footer="yes"
        data-tf-hide-headers="no"
        data-tf-opacity="50"
      ></div>`

    it('should load correct options', () => {
      const spy = jest.spyOn(require('../utils/load-options-from-attributes'), 'loadOptionsFromAttributes')
      const element = wrapper.querySelector('#element') as HTMLElement
      const options = buildOptionsFromAttributes(element)

      expect(spy).toHaveBeenCalledWith(element, {
        source: 'string',
        medium: 'string',
        mediumVersion: 'string',
        hideFooter: 'boolean',
        hideHeaders: 'boolean',
        opacity: 'integer',
      })
      expect(options).toEqual({
        source: 'unit-test-source',
        medium: 'unit-test-medium',
        mediumVersion: 'unit-test-version',
        hideFooter: true,
        hideHeaders: false,
        opacity: 50,
      })
    })
  })
})
