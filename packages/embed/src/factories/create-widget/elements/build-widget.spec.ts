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

  describe('#buildWidget with size', () => {
    it('should set min height of iFrame when requested height is 100%', () => {
      const iframe = document.createElement('iframe')
      buildWidget(iframe, '100px', '100%')
      expect(iframe.style.minHeight).toBe('350px')
    })

    it('should NOT set min height of iFrame when requested height is in px', () => {
      const iframe = document.createElement('iframe')
      buildWidget(iframe, '100px', '100px')
      expect(iframe.style.minHeight).toBeFalsy()
    })
  })
})
