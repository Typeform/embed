/* eslint-disable no-unused-vars */
import { render as renderMock } from 'react-dom'
import UrlParse from 'url-parse'

import makeWidget from './make-widget'
import {
  isMobile as isMobileMock
} from './utils/mobile-detection'

jest.mock('react-dom')
jest.mock('./utils/mobile-detection')

const URL = 'http://widget.cat'
const UID = 'unique uid'

describe('makeWidget', () => {
  it('renders a Widget component on desktop devices', () => {
    const element = document.createElement('div')
    const options = { opacity: 5, mandarina: 2 }

    isMobileMock.mockImplementationOnce(() => false)
    renderMock.mockClear()

    makeWidget(element, URL, options)

    const component = renderMock.mock.calls[0][0]

    expect(renderMock).toHaveBeenCalledTimes(1)

    const widgetURL = component.props.url
    const { query } = UrlParse(widgetURL, true)
    expect(query['embed-opacity']).toEqual('5')
    expect(query['mandarina']).toBeUndefined()

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
    expect(query['embed-opacity']).toBeUndefined()
    expect(query['mandarina']).toBeUndefined()

    expect(component.type.name).toEqual('Widget')
  })
})
