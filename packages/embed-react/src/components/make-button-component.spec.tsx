import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MutableRefObject } from 'react'

import { GenericEmbed } from '../utils'

import { makeButtonComponent } from './make-button-component'

describe('#makeButtonComponent', () => {
  type Props = {
    foo: string
    embedRef: MutableRefObject<GenericEmbed | undefined>
  }
  const ref: Props['embedRef'] = {
    current: undefined,
  }
  const openFn = jest.fn()
  const createFn = jest.fn().mockReturnValue({
    open: openFn,
    unmount: jest.fn(),
  })

  beforeEach(() => {
    ref.current = undefined
    openFn.mockReset()
    const Button = makeButtonComponent<Props>(createFn, 'popup')
    render(
      <>
        <Button
          id="form-id"
          foo="bar"
          buttonProps={{ 'aria-label': 'aria-value-btn', 'data-custom': 'value-custom' }}
          embedRef={ref}
        >
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

  it('should open embed via ref', async () => {
    await waitFor(() => expect(ref.current).not.toBe(undefined))
    ref.current?.open()
    await waitFor(() => expect(openFn).toHaveBeenCalledTimes(1))
  })
})
