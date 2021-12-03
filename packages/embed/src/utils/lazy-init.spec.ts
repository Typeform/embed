import { lazyInitialize } from './lazy-init'

let observe: jest.Mock
let unobserve: jest.Mock

export function setupIntersectionObserverMock({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}): void {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root
    readonly rootMargin: string = rootMargin
    readonly thresholds: ReadonlyArray<number> = thresholds
    disconnect: () => void = disconnect
    observe: (target: Element) => void = observe
    takeRecords: () => IntersectionObserverEntry[] = takeRecords
    unobserve: (target: Element) => void = unobserve
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}

beforeEach(() => {
  observe = jest.fn()
  unobserve = jest.fn()

  setupIntersectionObserverMock({ observe, unobserve })
})

describe('lazy-init', () => {
  it('should observe the target element', () => {
    const target = document.createElement('img')

    lazyInitialize(
      target,
      jest.fn(() => {})
    )

    expect(observe).toHaveBeenCalled()
  })
})
