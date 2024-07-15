import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MutableRefObject } from 'react'

import { GenericEmbed } from '../utils'

import { makeInitializerComponent } from './make-initializer-component'

describe('#makeInitializerComponent', () => {
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
    const Embed = makeInitializerComponent<Props>(createFn, 'popover')
    render(<Embed id="form-id" foo="bar" embedRef={ref} />)
  })

  it('should create embed', () => {
    expect(createFn).toHaveBeenCalledWith('form-id', { foo: 'bar' })
  })

  it('should open embed via ref', async () => {
    await waitFor(() => expect(ref.current).not.toBe(undefined))
    ref.current?.open()
    await waitFor(() => expect(openFn).toHaveBeenCalledTimes(1))
  })
})
