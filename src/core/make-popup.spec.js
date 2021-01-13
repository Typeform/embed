/* eslint-disable no-unused-vars */
import { render as renderMock } from 'react-dom'

import makePopup from './make-popup'
import { appendParamsToUrl } from './utils'
import { isMobile as isMobileMock, isScreenBig as isScreenBigMock } from './utils/mobile-detection'
import randomString from './utils/random-string'

jest.mock('react-dom')
jest.mock('./utils/mobile-detection')
jest.mock('./utils/random-string')

const URL = 'http://popup.cat'
const UID = 'a unique id'
const EMBED_ID = '123456'

randomString.mockImplementation(() => EMBED_ID)

isScreenBigMock.mockImplementation(() => true)

const instantiatePopup = (options) => {
  isMobileMock.mockImplementation(() => false)
  renderMock.mockClear()

  return makePopup(URL, options)
}

const renderPopupComponent = (autoOpen = false) => {
  const options = {
    hola: true,
    open: autoOpen ? 'load' : null,
    source: 'example.com',
    medium: 'embed-snippet',
    mediumVersion: '0.29.1',
  }

  const popup = instantiatePopup(options)
  const embedTriggerType = autoOpen ? '&typeform-embed-trigger-type=load' : ''
  if (!autoOpen) popup.open()
  const component = renderMock.mock.calls[0][0]

  expect(renderMock).toHaveBeenCalledTimes(1)
  expect(component.type.name).toEqual('Popup')
  expect(component.props.url).toEqual(
    `${URL}?typeform-embed=popup-blank&typeform-source=example.com&typeform-medium=embed-snippet&typeform-medium-version=0.29.1${embedTriggerType}`
  )
  expect(component.props.options).toEqual(expect.objectContaining(options))
}

const renderMobileModalComponent = (autoOpen = false) => {
  const spy = jest.fn()
  const options = {
    uid: UID,
    buttonText: 'hola',
    open: autoOpen ? 'load' : null,
    onSubmit: spy,
    source: 'my-website.com',
  }

  isMobileMock.mockImplementation(() => true)
  renderMock.mockClear()

  const popup = makePopup(URL, options)
  const embedTriggerType = autoOpen ? '&typeform-embed-trigger-type=load' : ''
  if (!autoOpen) popup.open()
  const component = renderMock.mock.calls[0][0]

  expect(renderMock).toHaveBeenCalledTimes(1)
  expect(component.type.name).toEqual('MobileModal')
  expect(component.props.url).toEqual(
    `${URL}?typeform-embed=popup-blank&typeform-source=my-website.com&typeform-medium=embed-sdk${embedTriggerType}`
  )
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
    renderMock.mockClear()

    expect(() => {
      makePopup(URL, options)
    }).toThrowError()
    expect(renderMock).toHaveBeenCalledTimes(0)
  })

  it('attaches the element to popup object', () => {
    const mockElement = document.createElement('test')
    expect(makePopup('', {}, mockElement).element).toBe(mockElement)
  })

  it(`renders a Popup component on desktop devices when 'width' option is a valid number`, () => {
    const options = { open: 'load', width: 650 }

    instantiatePopup(options)
    const component = renderMock.mock.calls[0][0]

    expect(renderMock).toHaveBeenCalledTimes(1)
    expect(component.type.name).toEqual('Popup')
    expect(component.props.options).toEqual(expect.objectContaining(options))
  })

  // eslint-disable-next-line jest/no-focused-tests
  it(`onReady is called during initialization`, async () => {
    const options = { onReady: jest.fn() }

    makePopup(URL, options)

    window.postMessage({ type: 'form-ready', embedId: EMBED_ID }, '*')
    await new Promise((resolve) => setTimeout(resolve))
    expect(options.onReady).toHaveBeenCalledTimes(1)
    expect(options.onReady).toHaveBeenCalledWith()
  })

  it(`onReady is not called for other embedId`, async () => {
    const options = { onReady: jest.fn() }

    makePopup(URL, options)

    window.postMessage({ type: 'form-ready', embedId: 'foo' }, '*')
    await new Promise((resolve) => setTimeout(resolve))
    expect(options.onReady).not.toHaveBeenCalled()
  })

  it(`onClose is called when form closes`, async () => {
    const options = { onClose: jest.fn() }

    makePopup(URL, options)

    window.postMessage({ type: 'form-closed', embedId: EMBED_ID }, '*')
    await new Promise((resolve) => setTimeout(resolve))

    expect(options.onClose).toHaveBeenCalledTimes(1)
    expect(options.onClose).toHaveBeenCalledWith()
  })

  it(`onClose is not called for other embedId`, async () => {
    const options = { onClose: jest.fn() }

    makePopup(URL, options)

    window.postMessage({ type: 'form-closed', embedId: 'bar' }, '*')
    await new Promise((resolve) => setTimeout(resolve))

    expect(options.onClose).not.toHaveBeenCalled()
  })
})
