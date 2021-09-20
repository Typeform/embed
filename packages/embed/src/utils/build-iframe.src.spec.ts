import { buildIframeSrc } from './build-iframe-src'

describe('build-iframe-src', () => {
  describe('#buildIframeSrc', () => {
    it('should return iframe src', () => {
      expect(buildIframeSrc({ formId: 'some-id', type: 'widget', embedId: '', options: {} })).toMatch(
        'https://form.typeform.com/to/some-id'
      )
    })

    it('should include default url options', () => {
      expect(buildIframeSrc({ formId: 'some-id', type: 'widget', embedId: 'embed-id', options: {} })).toBe(
        'https://form.typeform.com/to/some-id' +
          '?typeform-embed-id=embed-id' +
          '&typeform-embed=embed-widget' +
          '&typeform-source=localhost' +
          '&typeform-medium=embed-sdk' +
          '&typeform-medium-version=next'
      )
    })

    it('should override default url options if value is explicitly supplied', () => {
      const src = buildIframeSrc({
        formId: 'some-id',
        type: 'widget',
        embedId: 'id',
        options: { medium: 'unit-test-medium', source: 'unit-test-source' },
      })
      expect(src).toMatch('typeform-medium=unit-test-medium')
      expect(src).toMatch('typeform-source=unit-test-source')
    })

    it('should omit false url options', () => {
      const src = buildIframeSrc({
        formId: 'some-id',
        type: 'widget',
        embedId: '',
        options: { hideFooter: true, hideHeaders: false },
      })
      expect(src).toMatch('embed-hide-footer=true')
      expect(src).not.toMatch('embed-hide-headers')
    })

    it('should include all url options', () => {
      const options = {
        source: 'unit-test-source',
        medium: 'unit-test-medium',
        mediumVersion: 'unit-test-version',
        hideFooter: true,
        hideHeaders: true,
        opacity: 50,
        disableTracking: true,
        disableAutoFocus: true,
        hidden: {
          foo: 'foo value',
          bar: '@bar&value?',
        },
        enableSandbox: true,
        tracking: {
          utm_foo: 'utm foo value',
          foobar: 'foobar&value',
        },
      }
      expect(buildIframeSrc({ formId: 'some-id', type: 'widget', embedId: 'embed-id', options })).toBe(
        'https://form.typeform.com/to/some-id' +
          '?typeform-embed-id=embed-id' +
          '&typeform-embed=embed-widget' +
          '&typeform-source=unit-test-source' +
          '&typeform-medium=unit-test-medium' +
          '&typeform-medium-version=unit-test-version' +
          '&embed-hide-footer=true' +
          '&embed-hide-headers=true' +
          '&embed-opacity=50' +
          '&disable-tracking=true' +
          '&disable-auto-focus=true' +
          '&__dangerous-disable-submissions=true' +
          '&utm_foo=utm+foo+value&foobar=foobar%26value' +
          '#foo=foo+value&bar=%40bar%26value%3F'
      )
    })

    it('should disable tracking and submission on sandbox mode', () => {
      const options = {
        source: 'unit-test-source',
        medium: 'unit-test-medium',
        mediumVersion: 'unit-test-version',
        enableSandbox: true,
      }

      expect(buildIframeSrc({ formId: 'some-id', type: 'widget', embedId: 'embed-id', options })).toBe(
        'https://form.typeform.com/to/some-id' +
          '?typeform-embed-id=embed-id' +
          '&typeform-embed=embed-widget' +
          '&typeform-source=unit-test-source' +
          '&typeform-medium=unit-test-medium' +
          '&typeform-medium-version=unit-test-version' +
          '&disable-tracking=true' +
          '&__dangerous-disable-submissions=true'
      )
    })
  })
})
