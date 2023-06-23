import { getTransitiveSearchParams } from './get-transitive-search-params'

describe('transferUrlParametersToQueryStrings', () => {
  const { location } = window

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location
    const search =
      '?foo=jason&bar=rachel&utm_medium=cpc&utm_campaign=camp2008&utm_source=instagram&embed-hide-footer=false'

    window.location = {
      search,
      href: `http://localhost/${search}`,
    } as Location
  })

  afterAll(() => {
    window.location = location
  })

  it('transfer the parameters of the URL in the query strings', () => {
    const urlParameters = ['foo', 'bar']
    const queryStringWithTransferedUrlParameters = getTransitiveSearchParams(urlParameters)
    expect(queryStringWithTransferedUrlParameters).toEqual({
      foo: 'jason',
      bar: 'rachel',
    })
  })

  it('transfer ALL the parameters of the URL in the query strings', () => {
    const queryStringWithTransferedUrlParameters = getTransitiveSearchParams(true)
    expect(queryStringWithTransferedUrlParameters).toEqual({
      foo: 'jason',
      bar: 'rachel',
      utm_medium: 'cpc',
      utm_campaign: 'camp2008',
      utm_source: 'instagram',
      'embed-hide-footer': 'false',
    })
  })
})
