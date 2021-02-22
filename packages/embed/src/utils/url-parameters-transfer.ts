type Params = { [key: string]: string }

type QueryStrings = {
  [key: string]: any
}

const urlSearchToParams = (search: string) => {
  var params: Params = {}
  if (search !== '' && search !== null) {
    var vars = search.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      params[pair[0] as keyof Params] = decodeURIComponent(pair[1])
    }
  }
  return params
}

export const transferUrlParametersToQueryStrings = (
  transferableUrlParameters: string[],
  queryStrings: QueryStrings
) => {
  const urlSearchString = window.location.search.substr(1)
  const urlSearchParams = urlSearchToParams(urlSearchString)
  const queryStringsWithTransferedParams = { ...queryStrings }
  transferableUrlParameters.forEach((transferableParam: string) => {
    if (!(transferableParam in queryStrings)) {
      queryStringsWithTransferedParams[transferableParam] = urlSearchParams[transferableParam]
    }
  })
  return queryStringsWithTransferedParams
}
