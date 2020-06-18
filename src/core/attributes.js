const transformLegacyDataMode = dataMode => {
  const POPUPS_MODES = [
    {
      id: '1',
      mode: 'popup'
    },
    {
      id: '2',
      mode: 'drawer_left'
    },
    {
      id: '3',
      mode: 'drawer_right'
    }
  ]

  const element = POPUPS_MODES.find(m => m.id === dataMode)
  return element ? element.mode : dataMode
}

const getDataset = element => {
  const data = {}
  ;[].forEach.call(element.attributes, attr => {
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name
        .substr(5)
        .replace(/-(.)/g, ($0, $1) => $1.toUpperCase())
      data[camelCaseName] = attr.value
    }
  })
  return data
}

const sanitizePopupAttributes = data => {
  const obj = {}

  if (data.mode) {
    obj.mode = transformLegacyDataMode(data.mode)
  }

  const submitCloseDelay = parseInt(data.submitCloseDelay, 10)

  if (data.submitCloseDelay && submitCloseDelay >= 0) {
    obj.autoClose = submitCloseDelay
  }

  if (data.autoOpen === '' || data.autoOpen === 'true') {
    obj.autoOpen = true
  }

  if (data.hideHeaders === '' || data.hideHeaders === 'true') {
    obj.hideHeaders = true
  }

  if (data.hideFooter === '' || data.hideFooter === 'true') {
    obj.hideFooter = true
  }

  if (data.hideScrollbars === '' || data.hideScrollbars === 'true') {
    obj.hideScrollbars = true
  }

  if (data.open) {
    obj.open = data.open
    obj.openValue = data.openValue
  }

  return obj
}

const sanitizeWidgetAttributes = data => {
  const obj = {}

  if (data.hideHeaders === '' || data.hideHeaders === 'true') {
    obj.hideHeaders = true
  }

  if (data.hideFooter === '' || data.hideFooter === 'true') {
    obj.hideFooter = true
  }

  if (data.hideScrollbars === '' || data.hideScrollbars === 'true') {
    obj.hideScrollbars = true
  }

  const transparency = parseInt(data.transparency, 10)
  if (data.transparency && transparency >= 0 && transparency <= 100) {
    obj.opacity = 100 - transparency
  }

  if (data.buttonText) {
    obj.buttonText = data.buttonText
  }

  return obj
}

export { getDataset, sanitizePopupAttributes, sanitizeWidgetAttributes }
