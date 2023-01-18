import { sleep } from './sleep'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')
describe('#sleep', () => {
  it('should wait for 5 seconds', () => {
    sleep(5000)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)
  })
})
