import * as hubspotUtil from './hubspot'
import * as sleepUtil from './sleep'

const { getHubspotHiddenFields, waitForHubspotCookie } = hubspotUtil

let cookieValue = ''
Object.defineProperty(document, 'cookie', {
  get: () => cookieValue,
})

describe('#getHubspotHiddenFields', () => {
  const title = 'my page title'
  const href = 'http://my-url'
  const utk = 'foobar'

  Object.defineProperty(window, 'location', { value: { href } })
  Object.defineProperty(document, 'title', { value: title })

  it('should return correct hidden fields', () => {
    cookieValue = `foo=bar; hubspotutk=${utk}; bar=foo;`
    expect(getHubspotHiddenFields()).toEqual({
      hubspot_page_name: title,
      hubspot_page_url: href,
      hubspot_utk: utk,
    })
  })

  it('should return undefined utk value', () => {
    cookieValue = 'notahubspotutk=bar;'
    expect(getHubspotHiddenFields()).toEqual({
      hubspot_page_name: title,
      hubspot_page_url: href,
      hubspot_utk: undefined,
    })
  })
})

describe('#waitForHubspotCookie', () => {
  const sleepSpy = jest.spyOn(sleepUtil, 'sleep')
  const cookieSpy = jest.spyOn(hubspotUtil, 'getHubspotCookieValue')

  beforeEach(() => {
    sleepSpy.mockReset()
    cookieSpy.mockReset()
  })

  it('should wait until the cookie is set', async () => {
    sleepSpy.mockResolvedValue()
    cookieSpy
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce('utk')

    await waitForHubspotCookie()
    expect(sleepSpy).toHaveBeenCalledTimes(3)
    expect(cookieSpy).toHaveBeenCalledTimes(4)
  })

  it('should retry maximum of 10 times before continuing without no cookie', async () => {
    sleepSpy.mockResolvedValue()
    cookieSpy.mockReturnValue(undefined)

    await waitForHubspotCookie()

    expect(sleepSpy).toHaveBeenCalledTimes(10)
    expect(cookieSpy).toHaveBeenCalledTimes(11)
  })
})
