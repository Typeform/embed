import { createWidget } from './create-widget'

jest.useFakeTimers()

describe('create-widget', () => {
  describe('#createWidget', () => {
    const container = document.createElement('div')
    const containerAppendMock = jest.spyOn(container, 'append')
    const widgetMock = document.createElement('div')

    beforeAll(() => {
      jest.spyOn(require('./elements/build-widget'), 'buildWidget').mockImplementation(() => widgetMock)
      createWidget('url', { container })
    })

    it('should append widget to the container', () => {
      expect(containerAppendMock).toHaveBeenCalledTimes(1)
      expect(containerAppendMock).toHaveBeenCalledWith(widgetMock)
    })

    it('should render widget in container', () => {
      expect(widgetMock.parentNode).toBe(container)
    })
  })
})
