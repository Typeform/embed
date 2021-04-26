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
      <Button id="form-id" foo="bar">
        click
      </Button>
    )
  })

  it('should render button', () => {
    expect(screen.getByText('click')).toBeTruthy()
  })

  it('should open embed on click', () => {
    fireEvent.click(screen.getByText('click'))
    expect(createFn).toHaveBeenCalledWith('form-id', { foo: 'bar' })
    expect(openFn).toHaveBeenCalledTimes(1)
  })
})
