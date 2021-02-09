import { buildWidget } from './build-widget'

describe('build-widget', () => {
  describe('#buildWidget', () => {
    const iframe = document.createElement('iframe')
    const widget = buildWidget(iframe)

    it('should render widget wrapper', () => {
      expect(widget.className).toBe('typeform-widget')
    })

    it('should render iframe', () => {
      expect(iframe.parentNode).toBe(widget)
    })
  })
})
