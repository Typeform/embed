import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Widget } from './widget'

describe('<Widget/>', () => {
  it('should render wrapper', () => {
    const { container } = render(<Widget id="form-id" className="my-class" style={{ padding: 20 }} />)
    const div = container.querySelector('div.my-class') as HTMLDivElement
    expect(div).toBeTruthy()
    expect(div.style.padding).toBe('20px')
  })

  it('should render iframe', () => {
    render(<Widget id="form-id" />)
    expect(screen.getByTestId('iframe').getAttribute('src')).toMatch('form.typeform.com/to/form-id')
  })
})
