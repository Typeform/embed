import { createPopup, Popup } from './create-popup'

jest.useFakeTimers()

describe('create-popup', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      let popup: Popup
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')

      beforeAll(() => {
        popup = createPopup('url', { container, width: 200, height: 100 })
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
        const popupElement = container.querySelector('.typeform-popup') as HTMLElement
        const wrapper = popupElement.querySelector('.typeform-iframe-wrapper') as HTMLElement
        expect(popupElement).toBeVisible()
        expect(popupElement.querySelector('.typeform-spinner')).toBeVisible()
        expect(wrapper.querySelector('iframe')).toBeTruthy()
        expect(wrapper.querySelector('.typeform-close')).toBeTruthy()
        expect(wrapper.style.width).toBe('200px')
        expect(wrapper.style.height).toBe('100px')
      })
    })

    describe('#close', () => {
      const container = document.createElement('div')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should not remove typeform popup from the container if it was not open', () => {
        createPopup('url', { container }).close()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(0)
      })

      it('should remove typeform popup from the container', () => {
        const popup = createPopup('url', { container })
        popup.open()
        jest.runAllTimers()
        popup.close()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })

      it('should set back the initial scrollbar state', () => {
        const scrollInitialState = document.body.style.overflow
        const popup = createPopup('url', { container })
        popup.open()
        jest.runAllTimers()
        popup.close()
        jest.runAllTimers()
        expect(document.body.style.overflow).toBe(scrollInitialState)
      })

      it('should run onClose callback if provided', () => {
        const onClose = jest.fn()
        const popup = createPopup('url', { container, onClose })
        popup.open()
        popup.close()
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    describe('#toggle', () => {
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should open the popup', () => {
        createPopup('url', { container }).toggle()
        jest.runAllTimers()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })

      it('should close the popup', () => {
        const popup = createPopup('url', { container })
        popup.toggle()
        jest.runAllTimers()
        popup.toggle()
        jest.runAllTimers()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('#refresh', () => {
      const iframeReloadSpy = jest.fn()
      const iframeMock = {
        iframe: {
          contentWindow: {
            location: {
              reload: iframeReloadSpy,
            },
          },
        },
      }

      it('should reload iframe', () => {
        jest
          .spyOn(require('../../utils/create-iframe/create-iframe'), 'createIframe')
          .mockImplementation(() => iframeMock)

        createPopup('url', {}).refresh()
        jest.runAllTimers()
        expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
