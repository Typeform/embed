import { getIsWarningNeeded } from './create-http-warning-banner'

describe('create-http-warning-banner', () => {
  describe('getIsWarningNeeded', () => {
    it('Shouldnt alert when http is used on localhost', () => {
      window.location.assign('http://localhost')

      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(false)
    })
    it('Shouldnt alert when https is used on localhost', () => {
      window.location.assign('https://localhost')

      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(false)
    })
    it('Should alert when http is used with a loopback 0.0.0.0 address, but not "localhost" specifically', () => {
      setUrl('http://0.0.0.0')
      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(true)
    })
    it('Should alert when http is used with a loopback 127.0.0.0 address, but not "localhost" specifically', () => {
      setUrl('http://127.0.0.1')
      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(true)
    })
    it('Should not alert when https is used with a loopback 0.0.0.0 address, but not "localhost" specifically', () => {
      setUrl('https://0.0.0.0')
      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(false)
    })
    it('Should not alert when https is used with a loopback 127.0.0.0 address, but not "localhost" specifically', () => {
      setUrl('https://127.0.0.1')
      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(false)
    })
    it('Should alert when http is used with a regular domain', () => {
      setUrl('http://typeform.com')
      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(true)
    })
    it('Should not alert when https is used with a regular domain', () => {
      setUrl('https://typeform.com')
      const isWarningNeeded = getIsWarningNeeded()

      expect(isWarningNeeded).toBe(false)
    })
  })
})

function setUrl(url: string) {
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
    writable: true,
  })
}
