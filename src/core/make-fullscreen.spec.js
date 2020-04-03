import CustomEvent from 'custom-event'

import makeFullScreen from './make-fullscreen'

describe('makeFullScreen', () => {
  const URL = 'http://myiframe.cat'
  let iframe

  beforeEach(() => {
    iframe = document.createElement('iframe')

    iframe.src = URL
    document.body.appendChild(iframe)
  })

  it('updates the iframe source adding the embed mode', () => {
    makeFullScreen(iframe, URL, {})

    expect(iframe.src).toEqual(`${URL}/?typeform-embed=embed-fullpage`)
  })

  it('disables submission when option is passed', () => {
    makeFullScreen(iframe, URL, { disableTracking: true })

    expect(iframe.src).toEqual(`${URL}/?typeform-embed=embed-fullpage&disable-tracking=true`)
  })

  it('calls onSubmit callback function upon typeform submission', () => {
    const onSubmitMock = jest.fn()
    makeFullScreen(iframe, URL, { onSubmit: onSubmitMock })

    window.dispatchEvent(new CustomEvent('form-submit'))
    expect(onSubmitMock).toHaveBeenCalled()
  })
})
