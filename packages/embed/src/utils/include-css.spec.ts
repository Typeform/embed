import { includeCss } from './include-css'

describe('include-css', () => {
  describe('#includeCss', () => {
    beforeAll(() => {
      process.env.CSS_URL = '/foo/'
    })

    afterAll(() => {
      delete process.env.CSS_URL
    })

    it('should include CSS when it does not exist', () => {
      includeCss('bar.css')
      const cssLink = document.head.querySelector('link')
      expect(cssLink?.href).toBe('http://localhost/foo/bar.css')
      expect(cssLink?.rel).toBe('stylesheet')
    })

    it('should include different CSS when it does not exist', () => {
      includeCss('foobar.css')
      const cssLinks = document.head.querySelectorAll('link')
      expect(cssLinks.length).toBe(2)
      expect(cssLinks[0].href).toBe('http://localhost/foo/bar.css')
      expect(cssLinks[1].href).toBe('http://localhost/foo/foobar.css')
    })

    it('should not include CSS when it already exists', () => {
      includeCss('bar.css')
      expect(document.head.querySelectorAll('link').length).toBe(2)
    })
  })
})
