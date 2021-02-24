import { EmbedType } from '../base'

import { buildIframeSrc } from './build-iframe-src'

describe('build-iframe-src', () => {
  describe('#buildIframeSrc', () => {
    it('should return iframe src', () => {
      expect(buildIframeSrc({ formId: 'some-id', type: EmbedType.Widget, embedId: '', options: {} })).toMatch(
        'https://form.typeform.com/to/some-id'
      )
    })

    it('should include default url options', () => {
      expect(buildIframeSrc({ formId: 'some-id', type: EmbedType.Widget, embedId: 'embed-id', options: {} })).toBe(
        'https://form.typeform.com/to/some-id' +
          '?typeform-embed-id=embed-id' +
          '&typeform-embed=embed-widget' +
          '&typeform-source=localhost' +
          '&typeform-medium=embed-sdk'
      )
    })

    it('should override default url options if value is explicitly supplied', () => {
      const src = buildIframeSrc({
        formId: 'some-id',
        type: EmbedType.Widget,
        embedId: 'id',
        options: { medium: 'unit-test-medium', source: 'unit-test-source' },
      })
      expect(src).toMatch('typeform-medium=unit-test-medium')
      expect(src).toMatch('typeform-source=unit-test-source')
    })

    it('should omit false url options', () => {
      const src = buildIframeSrc({
        formId: 'some-id',
        type: EmbedType.Widget,
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
      }
      expect(buildIframeSrc({ formId: 'some-id', type: EmbedType.Widget, embedId: 'embed-id', options })).toBe(
        'https://form.typeform.com/to/some-id' +
          '?typeform-embed-id=embed-id' +
          '&typeform-embed=embed-widget' +
          '&typeform-source=unit-test-source' +
          '&typeform-medium=unit-test-medium' +
          '&typeform-medium-version=unit-test-version' +
          '&embed-hide-footer=true' +
          '&embed-hide-headers=true' +
          '&embed-opacity=50' +
          '&disable-tracking=true'
      )
    })
  })
})
