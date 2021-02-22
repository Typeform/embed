import { EmbedType } from '../base'

import { buildIframeSrc } from './build-iframe-src'

describe('build-iframe-src', () => {
  describe('#buildIframeSrc', () => {
    it('should return iframe src', () => {
      expect(buildIframeSrc('some-id', EmbedType.Widget, {})).toBe('https://form.typeform.com/to/some-id')
    })
  })
})
