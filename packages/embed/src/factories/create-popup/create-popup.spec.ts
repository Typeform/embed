import { createPopup, Popup } from './create-popup'

jest.useFakeTimers()

describe('create-popup', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      let popup: Popup
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')

      beforeAll(async () => {
        popup = await createPopup('url', { container, width: 200, height: 100 })
        popup.open()
        jest.runAllTimers()
      })

      it('should append typeform popup to the container', () => {
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should not open the popup twice', () => {
        popup.open()
        jest.runAllTimers()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should disable the document scroll', () => {
        expect(document.body.style.overflow).toBe('hidden')
      })

      it('should render the popup', () => {
        const popupElement = container.querySelector('.tf-v1-popup') as HTMLElement
        const wrapper = popupElement.querySelector('.tf-v1-iframe-wrapper') as HTMLElement
        expect(popupElement).toBeVisible()
        expect(popupElement.querySelector('.tf-v1-spinner')).toBeVisible()
        expect(wrapper.querySelector('iframe')).toBeTruthy()
        expect(wrapper.querySelector('.tf-v1-close')).toBeTruthy()
        expect(wrapper.style.width).toBe('200px')
        expect(wrapper.style.height).toBe('100px')
      })
    })

    describe('#close', () => {
      const container = document.createElement('div')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should not remove typeform popup from the container if it was not open', async () => {
        ;(await createPopup('url', { container })).close()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(0)
      })

      it('should remove typeform popup from the container', async () => {
        const popup = await createPopup('url', { container })
        popup.open()
        jest.runAllTimers()
        popup.close()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })

      it('should set back the initial scrollbar state', async () => {
        const scrollInitialState = document.body.style.overflow
        const popup = await createPopup('url', { container })
        popup.open()
        jest.runAllTimers()
        popup.close()
        jest.runAllTimers()
        expect(document.body.style.overflow).toBe(scrollInitialState)
      })

      it('should run onClose callback if provided', async () => {
        const onClose = jest.fn()
        const popup = await createPopup('url', { container, onClose })
        popup.open()
        popup.close()
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    describe('#toggle', () => {
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should open the popup', async () => {
        ;(await createPopup('url', { container })).toggle()
        jest.runAllTimers()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should close the popup', async () => {
        const popup = await createPopup('url', { container })
        popup.toggle()
        jest.runAllTimers()
        popup.toggle()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
