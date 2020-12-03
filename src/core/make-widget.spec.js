/* eslint-disable no-unused-vars */
import { render as renderMock } from 'react-dom'
import UrlParse from 'url-parse'

import makeWidget from './make-widget'
import {
  isMobile as isMobileMock
} from './utils/mobile-detection'
import randomString from './utils/random-string'

jest.mock('react-dom')
jest.mock('./utils/mobile-detection')
jest.mock('./utils/random-string')

const URL = 'http://widget.cat'
const EMBED_ID = '123456'

randomString.mockImplementation(() => EMBED_ID)

describe('makeWidget', () => {
  it('renders a Widget component on desktop devices', () => {
    const element = document.createElement('div')
    const options = {
      opacity: 5,
      mandarina: 2,
      source: 'website.com',
      medium: 'embed-wordpress',
      mediumVersion: '9999'
    }

    isMobileMock.mockImplementationOnce(() => false)
    renderMock.mockClear()

    makeWidget(element, URL, options)

    const component = renderMock.mock.calls[0][0]

    expect(renderMock).toHaveBeenCalledTimes(1)

    const widgetURL = component.props.url
    const { query } = UrlParse(widgetURL, true)
    expect(query['embed-opacity']).toEqual('5')
    expect(query['mandarina']).toBeUndefined()
    expect(query['typeform-source']).toEqual('website.com')
    expect(query['typeform-medium']).toEqual('embed-wordpress')
    expect(query['typeform-medium-version']).toEqual('9999')
    expect(component.type.name).toEqual('Widget')
    expect(component.props.options).toEqual(expect.objectContaining(options))
  })

  it('renders Widget component on mobile devices', () => {
    const element = document.createElement('div')
    const onSubmitSpy = jest.fn()
    const options = { onSubmit: onSubmitSpy, opacity: 5, mandarina: 2 }

    isMobileMock.mockImplementationOnce(() => true)
    renderMock.mockClear()

    makeWidget(element, URL, options)

    expect(renderMock).toHaveBeenCalledTimes(1)

    const component = renderMock.mock.calls[0][0]

    const widgetURL = component.props.url
    const { query } = UrlParse(widgetURL, true)
    expect(query['add-placeholder-ws']).toBe('true')
    expect(query['mandarina']).toBeUndefined()

    expect(component.type.name).toEqual('Widget')
  })

  it(`onReady is called during initialization`, async () => {
    const element = document.createElement('div')
    const options = { onReady: jest.fn() }

    makeWidget(element, URL, options)

    window.postMessage({ type: 'form-ready', embedId: EMBED_ID }, '*')
    await new Promise((resolve) => setTimeout(resolve))
    expect(options.onReady).toHaveBeenCalledTimes(1)
    expect(options.onReady).toHaveBeenCalledWith()
  })

  it(`onReady is not called for other embedId`, async () => {
    const element = document.createElement('div')
    const options = { onReady: jest.fn() }

    makeWidget(element, URL, options)

    window.postMessage({ type: 'form-ready', embedId: 'foo' }, '*')
    await new Promise((resolve) => setTimeout(resolve))
    expect(options.onReady).not.toHaveBeenCalled()
  })
})
