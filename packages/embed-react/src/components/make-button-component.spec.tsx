import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { makeButtonComponent } from './make-button-component'

describe('#makeButtonComponent', () => {
  const openFn = jest.fn()
  const createFn = jest.fn().mockReturnValue({
    open: openFn,
    unmount: jest.fn(),
  })

  beforeEach(() => {
    type Props = {
      foo: string
    }
    const Button = makeButtonComponent<Props>(createFn, 'popup')
    render(
      <>
        <Button id="form-id" foo="bar" buttonProps={{ 'aria-label': 'aria-value-btn', 'data-custom': 'value-custom' }}>
          click
        </Button>
      </>
    )
  })

  it('should render button', () => {
    const btn = screen.getByText('click')
    expect(btn).toBeTruthy()
    expect(btn.getAttribute('aria-label')).toBe('aria-value-btn')
    expect(btn.getAttribute('data-custom')).toBe('value-custom')
  })

  it('should open embed on click', () => {
    fireEvent.click(screen.getByText('click'))
    expect(createFn).toHaveBeenCalledWith('form-id', { foo: 'bar' })
    expect(openFn).toHaveBeenCalledTimes(1)
  })
})
