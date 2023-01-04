import { createSlider, Slider } from './create-slider'

jest.useFakeTimers()

describe('create-slider', () => {
  describe('#createSlider', () => {
    describe('#open', () => {
      let slider: Slider
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')

      beforeAll(async () => {
        slider = await createSlider('url', { container, width: 250 })
        slider.open()
        jest.runAllTimers()
      })

      it('should append typeform slider to the container', () => {
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should not open the slider twice', () => {
        slider.open()
        jest.runAllTimers()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should disable the document scroll', () => {
        expect(document.body.style.overflow).toBe('hidden')
      })

      it('should render the slider from right', () => {
        const sliderElement = container.querySelector('.tf-v1-slider') as HTMLElement
        const wrapper = sliderElement.querySelector('.tf-v1-iframe-wrapper') as HTMLElement

        expect(sliderElement).toBeTruthy()
        expect(sliderElement.querySelector('.tf-v1-spinner')).toBeTruthy()
        expect(wrapper.querySelector('iframe')).toBeTruthy()
        expect(wrapper.querySelector('.tf-v1-close')).toBeTruthy()
        expect(sliderElement.querySelectorAll('.tf-v1-slider.left').length).toBe(0)
        expect(wrapper.style.width).toBe('250px')
      })

      it('should open and render the slider from left', async () => {
        const containerLeft = document.createElement('div')
        const slider = await createSlider('url', { container: containerLeft, position: 'left' })
        slider.open()

        const sliderElement = containerLeft.querySelector('.tf-v1-slider.left') as HTMLElement
        const wrapper = sliderElement.querySelector('.tf-v1-iframe-wrapper') as HTMLElement

        expect(sliderElement).toBeTruthy()
        expect(sliderElement.querySelector('.tf-v1-spinner')).toBeTruthy()
        expect(wrapper.querySelector('iframe')).toBeTruthy()
        expect(wrapper.querySelector('.tf-v1-close')).toBeTruthy()
      })
    })

    describe('#close', () => {
      const container = document.createElement('div')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should not remove typeform slider from the container if it was not open', async () => {
        const slider = await createSlider('url', { container })
        slider.close()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(0)
      })

      it('should remove typeform slider from the container', async () => {
        const slider = await createSlider('url', { container })
        slider.open()
        jest.runAllTimers()
        slider.close()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })

      it('should set back the initial scrollbar state', async () => {
        const scrollInitialState = document.body.style.overflow
        const slider = await createSlider('url', { container })
        slider.open()
        jest.runAllTimers()
        slider.close()
        jest.runAllTimers()
        expect(document.body.style.overflow).toBe(scrollInitialState)
      })

      it('should run onClose callback if provided', async () => {
        const onClose = jest.fn()
        const slider = await createSlider('url', { container, onClose })
        slider.open()
        slider.close()
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    describe('#toggle', () => {
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should open the slider', async () => {
        const slider = await createSlider('url', { container })
        slider.toggle()
        jest.runAllTimers()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should close the slider', async () => {
        const slider = await createSlider('url', { container })
        slider.toggle()
        jest.runAllTimers()
        slider.toggle()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
