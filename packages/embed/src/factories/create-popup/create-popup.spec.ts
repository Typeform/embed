import { createPopup, Popup } from './create-popup'

describe('create-popup', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      let popup: Popup
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const popupMock = document.createElement('div')

      beforeAll(() => {
        jest.spyOn(require('./elements/build-popup'), 'buildPopup').mockImplementation(() => popupMock)
        popup = createPopup('url', { container })
        popup.open()
      })

      it('should append typeform popup to the container', () => {
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
        expect(containerAppendSpy).toHaveBeenCalledWith(popupMock)
      })

      it('should render popup in container', () => {
        expect(popupMock.parentNode).toBe(container)
      })

      it('should not open the popup twice', () => {
        popup.open()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('#close', () => {
      const container = document.createElement('div')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should not remove typeform popup from the container if it was not open', () => {
        createPopup('url', { container }).close()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(0)
      })

      it('should remove typeform popup from the container', () => {
        const popup = createPopup('url', { container })
        popup.open()
        popup.close()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('#toggle', () => {
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')
      const popupMock = document.createElement('div')

      beforeAll(() => {
        jest.spyOn(require('./elements/build-popup'), 'buildPopup').mockImplementation(() => popupMock)
      })

      it('should open the popup', () => {
        createPopup('url', { container }).toggle()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
        expect(containerAppendSpy).toHaveBeenCalledWith(popupMock)
        expect(popupMock.parentNode).toBe(container)
      })

      it('should close the popup', () => {
        const popup = createPopup('url', { container })
        popup.toggle()
        popup.toggle()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('#refresh', () => {
      const iframeReloadSpy = jest.fn()
      const iframeMock = {
        contentWindow: {
          location: {
            reload: iframeReloadSpy,
          },
        },
      }

      jest
        .spyOn(require('../../utils/create-iframe/create-iframe'), 'createIframe')
        .mockImplementation(() => iframeMock)

      it('should reload iframe', () => {
        createPopup('url', {}).refresh()
        expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
