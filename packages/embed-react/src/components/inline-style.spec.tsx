import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { InlineStyle } from './inline-style'

describe('<InlineStyle />', () => {
  it('should render inline CSS', () => {
    render(
      <>
        <div className="tf-v1-widget" data-testid="wrapper">
          <iframe title="foo" data-testid="iframe" />
        </div>
        <InlineStyle filename="widget" />
      </>
    )

    const wrapperStyle = window.getComputedStyle(screen.getByTestId('wrapper'))
    expect(wrapperStyle.width).toBe('100%')
    expect(wrapperStyle.height).toBe('100%')

    const iframeStyle = window.getComputedStyle(screen.getByTestId('iframe'))
    expect(iframeStyle.width).toBe('100%')
    expect(iframeStyle.height).toBe('100%')
    expect(iframeStyle.overflow).toBe('hidden')
    expect(iframeStyle.borderRadius).toBe('8px')
  })

  it('should support __webpack_nonce__', () => {
    global.__webpack_nonce__ = 'AA=='

    render(
      <>
        <div data-testid="style">
          <InlineStyle filename="widget" />
        </div>
      </>
    )

    // eslint-disable-next-line prefer-destructuring
    const styleElement = screen.getByTestId('style').getElementsByTagName('style')[0]
    expect(styleElement.nonce).toBe('AA==')
  })
})
