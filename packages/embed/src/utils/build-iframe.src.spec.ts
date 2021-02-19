import { buildIframeSrc } from './build-iframe-src'

describe('build-iframe-src', () => {
  describe('#buildIframeSrc', () => {
    it('should return iframe src', () => {
      expect(buildIframeSrc({ formId: 'some-id', type: 'widget', embedId: 'random-id', options: {} })).toBe(
        'https://form.typeform.com/to/some-id?typeform-embed-id=random-id'
      )
    })
  })
})
