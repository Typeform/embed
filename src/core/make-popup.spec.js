/* eslint-disable no-unused-vars */
import { render as renderMock } from 'react-dom'

import makePopup from './make-popup'
import {
  appendParamsToUrl as appendParamsToUrlMock
} from './utils'
import {
  isMobile as isMobileMock,
  isScreenBig as isScreenBigMock
} from './utils/mobile-detection'

jest.mock('react-dom')
jest.mock('./utils')
jest.mock('./utils/mobile-detection')

const URL = 'http://popup.cat'
const UID = 'a unique id'

isScreenBigMock.mockImplementation(() => true)

const instantiatePopup = (options) => {
  isMobileMock.mockImplementation(() => false)
  appendParamsToUrlMock.mockImplementation((url) => url)
  renderMock.mockClear()

  return makePopup(URL, options)
}

const renderPopupComponent = (autoOpen = false) => {
  const options = { hola: true, open: autoOpen ? 'load' : null }

  const popup = instantiatePopup(options)
  if (!autoOpen) popup.open()
  const component = renderMock.mock.calls[0][0]

  expect(renderMock).toHaveBeenCalledTimes(1)
  expect(component.type.name).toEqual('Popup')
  expect(component.props.url).toEqual(URL)
  expect(component.props.options).toEqual(expect.objectContaining(options))
}

const renderMobileModalComponent = (autoOpen = false) => {
  const spy = jest.fn()
  const options = { uid: UID, buttonText: 'hola', open: autoOpen ? 'load' : null, onSubmit: spy }

  isMobileMock.mockImplementation(() => true)
  renderMock.mockClear()

  const popup = makePopup(URL, options)
  if (!autoOpen) popup.open()
  const component = renderMock.mock.calls[0][0]

  expect(renderMock).toHaveBeenCalledTimes(1)
  expect(component.type.name).toEqual('MobileModal')
  expect(component.props.url).toEqual(URL)
  expect(component.props.buttonText).toEqual(options.buttonText)

  component.props.onSubmit()
  expect(spy).toHaveBeenCalledTimes(1)
}

describe('makePopup', () => {
  describe(`when 'autoOpen' is true`, () => {
    it('renders a Popup component on desktop devices', () => {
      renderPopupComponent(true)
    })

    it('renders MobileModal component on mobile devices', () => {
      renderMobileModalComponent(true)
    })
  })

  describe(`when 'autoOpen' is false`, () => {
    it('renders a Popup component on desktop devices when opened', () => {
      renderPopupComponent()
    })

    it('renders MobileModal component on mobile devices when opened', () => {
      renderMobileModalComponent()
    })
  })

  it(`throws an error when 'width' option is not a number`, () => {
    const options = { autoOpen: true, width: 'hello' }

    isMobileMock.mockImplementation(() => false)
    appendParamsToUrlMock.mockImplementation((url) => url)
    renderMock.mockClear()

    expect(() => {
      makePopup(URL, options)
    }).toThrowError()
    expect(renderMock).toHaveBeenCalledTimes(0)
  })

  it(`renders a Popup component on desktop devices when 'width' option is a valid number`, () => {
    const options = { open: 'load', width: 650 }

    instantiatePopup(options)
    const component = renderMock.mock.calls[0][0]

    expect(renderMock).toHaveBeenCalledTimes(1)
    expect(component.type.name).toEqual('Popup')
    expect(component.props.options).toEqual(expect.objectContaining(options))
  })

  it(`onReady is called during initialization`, async () => {
    const options = { onReady: jest.fn() }

    makePopup(URL, options)

    window.postMessage({ type: 'form-ready' }, '*')
    await new Promise((resolve) => setTimeout(resolve))
    expect(options.onReady).toHaveBeenCalledTimes(1)
    expect(options.onReady).toHaveBeenCalledWith()
  })

  it(`onClose is called when form closes`, async () => {
    const options = { onClose: jest.fn() }

    makePopup(URL, options)

    window.postMessage({ type: 'form-closed' }, '*')
    await new Promise((resolve) => setTimeout(resolve))

    expect(options.onClose).toHaveBeenCalledTimes(1)
    expect(options.onClose).toHaveBeenCalledWith()
  })
})
