import { buildWidget } from './build-widget'

describe('build-widget', () => {
  describe('#buildWidget', () => {
    const iframe = document.createElement('iframe')
    const widget = buildWidget(iframe)

    it('should render widget wrapper', () => {
      expect(widget.className).toBe('tf-v1-widget')
    })

    it('should render iframe', () => {
      expect(iframe.parentNode).toBe(widget)
    })

    it('should render widget with size', () => {
      const widget = buildWidget(iframe, 200, 400)
      expect(widget).toHaveStyle({
        width: '200px',
        height: '400px',
      })
    })
  })
})
