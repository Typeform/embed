import { getTransitiveSearchParams } from './get-transitive-search-params'

describe('transferUrlParametersToQueryStrings', () => {
  const location: Location = window.location

  beforeAll(() => {
    delete (window as any).location
    const search =
      '?foo=jason&bar=rachel&utm_medium=cpc&utm_campaign=camp2008&utm_source=instagram&embed-hide-footer=false'

    window.location = {
      search,
      href: `http://localhost/${search}`,
    } as any
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
})
