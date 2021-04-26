import * as React from 'react'
import { render } from '@testing-library/react'

import { makeInitializerComponent } from './make-initializer-component'

describe('#makeInitializerComponent', () => {
  const createFn = jest.fn().mockReturnValue({
    unmount: jest.fn(),
  })

  beforeEach(() => {
    type Props = {
      foo: string
    }
    const Embed = makeInitializerComponent<Props>(createFn, 'popover')
    render(<Embed id="form-id" foo="bar" />)
  })

  it('should create embed', () => {
    expect(createFn).toHaveBeenCalledWith('form-id', { foo: 'bar' })
  })
})
