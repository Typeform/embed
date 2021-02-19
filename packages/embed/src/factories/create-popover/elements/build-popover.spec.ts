import { buildPopover } from './build-popover'

describe('build-popover', () => {
  describe('#buildPopover', () => {
    const iframe = document.createElement('iframe')
    const popover = buildPopover(iframe)

    it('should render popover wrapper', () => {
      expect(popover.className).toBe('typeform-popover')
    })

    it('should render iframe', () => {
      expect(iframe.parentNode).toBe(popover)
    })
  })
})
