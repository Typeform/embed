const urlSearchToParams = (search) => {
  var params = {}
  if (search !== '' && search !== null) {
    var vars = search.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      params[pair[0]] = decodeURIComponent(pair[1])
    }
  }
  return params
}

export const transferUrlParametersToQueryStrings = (transferableUrlParameters, queryStrings) => {
  const urlSearchString = window.location.search.substr(1)
  const urlSearchParams = urlSearchToParams(urlSearchString)
  const queryStringsWithTransferedParams = { ...queryStrings }
  transferableUrlParameters.forEach((transferableParam) => {
    if (!(transferableParam in queryStrings) && transferableParam in urlSearchParams) {
      queryStringsWithTransferedParams[transferableParam] = urlSearchParams[transferableParam]
    }
  })
  return queryStringsWithTransferedParams
}
