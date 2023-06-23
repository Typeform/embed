import { invokeWithoutDefault } from './invoke-without-default'

describe('#invokeWithoutDefault', () => {
  it('should invoke the function passed as argument but call preventDefault() on event', () => {
    const func = jest.fn()
    const event = { preventDefault: jest.fn() } as unknown as MouseEvent
    const handler = invokeWithoutDefault(func)
    expect(func).not.toHaveBeenCalled()
    expect(event.preventDefault).not.toHaveBeenCalled()
    handler(event)
    expect(func).toHaveBeenCalled()
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should invoke the function passed as argument when called without event', () => {
    const func = jest.fn()
    const handler = invokeWithoutDefault(func)
    expect(func).not.toHaveBeenCalled()
    handler()
    expect(func).toHaveBeenCalled()
  })
})
