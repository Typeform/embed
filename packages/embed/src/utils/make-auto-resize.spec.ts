import { makeAutoResize } from './make-auto-resize'

let isMobile: boolean = true
jest.mock('./mobile', () => ({
  isMobile: () => isMobile,
}))

describe('#makeUutoResize', () => {
  const styleSpy = jest.fn()
  const fakeElm: any = {
    style: {
      setProperty: styleSpy,
    },
  }

  beforeEach(() => {
    styleSpy.mockClear()
  })

  describe('auto resize for all devices', () => {
    const resize = makeAutoResize(fakeElm, true)

    it('should resize element on mobile', () => {
      isMobile = true
      resize()
      expect(styleSpy).toHaveBeenCalledWith('height', `${window.innerHeight}px`, 'important')
    })

    it('should resize element on desktop', () => {
      isMobile = false
      resize()
      expect(styleSpy).toHaveBeenCalledWith('height', `${window.innerHeight}px`, 'important')
    })
  })

  describe('auto resize for mobile devices only', () => {
    const resize = makeAutoResize(fakeElm)

    it('should resize element on mobile', () => {
      isMobile = true
      resize()
      expect(styleSpy).toHaveBeenCalledWith('height', `${window.innerHeight}px`, 'important')
    })

    it('should resize element on desktop', () => {
      isMobile = false
      resize()
      expect(styleSpy).toHaveBeenCalledTimes(0)
    })
  })
})
