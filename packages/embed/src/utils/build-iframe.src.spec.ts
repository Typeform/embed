import { buildIframeSrc } from './build-iframe-src'

describe('build-iframe-src', () => {
  describe('#buildIframeSrc', () => {
    it('should return iframe src', () => {
      expect(buildIframeSrc('some-url', 'widget', {})).toBe('some-url')
    })
  })
})
