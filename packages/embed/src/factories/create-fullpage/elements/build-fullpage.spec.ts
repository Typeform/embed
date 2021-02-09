import { buildFullpage } from './build-fullpage'

describe('build-fullpage', () => {
  describe('#buildFullpage', () => {
    const iframe = document.createElement('iframe')
    const fullpage = buildFullpage(iframe)

    it('should render widget wrapper', () => {
      expect(fullpage.className).toBe('typeform-fullpage')
    })

    it('should render iframe', () => {
      expect(iframe.parentNode).toBe(fullpage)
    })
  })
})
