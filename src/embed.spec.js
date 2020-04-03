/* eslint-disable no-unused-vars */

import {
  getDataset as getDatasetMock,
  sanitizePopupAttributes as sanitizePopupAttributesMock,
  sanitizeWidgetAttributes as sanitizeWidgetAttributesMock
} from './../src/core/attributes'
import {
  makePopup as makePopupMock,
  makeWidget as makeWidgetMock,
  makeFullScreen as makeFullScreenMock
} from './../src/api'

jest.mock('./../src/api')
jest.mock('./../src/core/attributes')

const POPUP_URL = 'http://popup.cat'
const WIDGET1_URL = 'http://widget1.cat'
const WIDGET2_URL = 'http://widget2.cat'
const FULLSCREEN_URL = 'http://fullscreen.cat/'
const POPUP_ATTR = { popup: true }
const WIDGET_ATTR = { widget: true }

document.body.innerHTML = `
<div>
  <a href="${POPUP_URL}" class="typeform-share">hola</a>
  <div class="typeform-widget"></div>
  <div class="typeform-widget"></div>
  <iframe id="typeform-full" src="${FULLSCREEN_URL}"></iframe>
</div>`
const widget1 = document.getElementsByClassName('typeform-widget')[0]
const widget2 = document.getElementsByClassName('typeform-widget')[1]
const fullscreen = document.getElementById('typeform-full')

getDatasetMock
  .mockReturnValueOnce({ url: POPUP_URL })
  .mockReturnValueOnce({ url: WIDGET1_URL })
  .mockReturnValueOnce({ url: WIDGET2_URL })

sanitizePopupAttributesMock.mockImplementation(() => POPUP_ATTR)
sanitizeWidgetAttributesMock.mockImplementation(() => WIDGET_ATTR)

require('./../src/embed')

describe('Embed', () => {
  it('initialises popup elements', () => {
    expect(makePopupMock).toHaveBeenCalledTimes(1)
    expect(sanitizePopupAttributesMock).toHaveBeenCalledTimes(1)
    expect(makePopupMock).toBeCalledWith(POPUP_URL, POPUP_ATTR)
  })

  it('initialises widget elements', () => {
    expect(makeWidgetMock).toHaveBeenCalledTimes(2)
    expect(sanitizeWidgetAttributesMock).toHaveBeenCalledTimes(2)
    expect(makeWidgetMock).toBeCalledWith(widget1, WIDGET1_URL, WIDGET_ATTR)
    expect(makeWidgetMock).toBeCalledWith(widget2, WIDGET2_URL, WIDGET_ATTR)
  })

  it('initialises fullscreen element', () => {
    expect(makeFullScreenMock).toHaveBeenCalledTimes(1)
    expect(makeFullScreenMock).toBeCalledWith(fullscreen, FULLSCREEN_URL, {})
  })
})
