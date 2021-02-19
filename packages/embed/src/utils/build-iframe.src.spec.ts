import { buildIframeSrc } from './build-iframe-src'

describe('build-iframe-src', () => {
  describe('#buildIframeSrc', () => {
    it('should return iframe src', () => {
      expect(buildIframeSrc('some-id', 'widget', {})).toBe(
        'https://form.typeform.com/to/some-id?typeform-embed=embed-widget'
      )
    })

    it('should include url options', () => {
      expect(buildIframeSrc('some-id', 'widget', { source: 'unit-test-source' })).toBe(
        'https://form.typeform.com/to/some-id?typeform-embed=embed-widget&typeform-source=unit-test-source'
      )
    })

    it('should omit false url options', () => {
      expect(buildIframeSrc('some-id', 'widget', { hideFooter: true, hideHeaders: false })).toBe(
        'https://form.typeform.com/to/some-id?typeform-embed=embed-widget&embed-hide-footer=true'
      )
    })

    it('should include all url options', () => {
      const options = {
        source: 'unit-test-source',
        medium: 'unit-test-medium',
        mediumVersion: 'unit-test-version',
        hideFooter: true,
        hideHeaders: true,
        opacity: 50,
      }
      expect(buildIframeSrc('some-id', 'widget', options)).toBe(
        'https://form.typeform.com/to/some-id?typeform-embed=embed-widget' +
          '&typeform-source=unit-test-source' +
          '&typeform-medium=unit-test-medium' +
          '&typeform-medium-version=unit-test-version' +
          '&embed-hide-footer=true' +
          '&embed-hide-headers=true' +
          '&embed-opacity=50'
      )
    })
  })
})
