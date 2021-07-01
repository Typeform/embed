import { transferUrlParametersToQueryStrings } from './url-parameters-transfer'

describe('transferUrlParametersToQueryStrings', () => {
  const { location } = window

  beforeAll(() => {
    delete window.location
    window.location = {
      search: '?foo=jason&bar=rachel&utm_medium=cpc&utm_campaign=camp2008&utm_source=instagram&embed-hide-footer=false',
    }
  })

  afterAll(() => {
    window.location = location
  })

  it('should return ?foo=jason&bar=rachel&utm_medium=cpc&utm_campaign=camp2008&utm_source=instagram&embed-hide-footer=false', () => {
    expect(window.location.search).toEqual(
      '?foo=jason&bar=rachel&utm_medium=cpc&utm_campaign=camp2008&utm_source=instagram&embed-hide-footer=false'
    )
  })

  it('transfer the parameters of the URL in the query strings', () => {
    const urlParameters = ['foo', 'bar']
    const queryStrings = {}
    const queryStringWithTransferedUrlParameters = transferUrlParametersToQueryStrings(urlParameters, queryStrings)
    expect(queryStringWithTransferedUrlParameters).toEqual({ foo: 'jason', bar: 'rachel' })
  })

  it('does not override existing queryString for embed configuration', () => {
    const urlParameters = ['foo', 'bar', 'embed-hide-footer']
    const queryStrings = { 'embed-hide-footer': true }
    const queryStringWithTransferedUrlParameters = transferUrlParametersToQueryStrings(urlParameters, queryStrings)
    expect(queryStringWithTransferedUrlParameters).toEqual({
      foo: 'jason',
      bar: 'rachel',
      'embed-hide-footer': true,
    })
  })

  it('skip missing url params', () => {
    const randomParameter = `random-${Math.random()}`
    const queryStringWithTransferedUrlParameters = transferUrlParametersToQueryStrings([randomParameter, 'foo'], {})
    expect(queryStringWithTransferedUrlParameters).toStrictEqual({ foo: 'jason' })
  })

  it('ensure empty url params are accepted', () => {
    window.location = { search: '?empty-param=&filled=value' }
    const urlParameters = ['empty-param', 'filled']
    const queryStringWithTransferedUrlParameters = transferUrlParametersToQueryStrings(urlParameters, {})
    expect(queryStringWithTransferedUrlParameters).toStrictEqual({ 'empty-param': '', filled: 'value' })
  })
})
