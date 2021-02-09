import { createPopup, Popup } from './create-popup'

describe('create-popup', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      let popup: Popup
      const container = document.createElement('div')
      const containerAppendMock = jest.spyOn(container, 'append')
      const popupMock = document.createElement('div')

      jest.spyOn(require('./elements/build-popup'), 'buildPopup').mockImplementation(() => popupMock)

      beforeAll(() => {
        popup = createPopup('url', { container })
        popup.open()
      })

      it('should append typeform popup to the container', () => {
        expect(containerAppendMock).toHaveBeenCalledTimes(1)
        expect(containerAppendMock).toHaveBeenCalledWith(popupMock)
      })

      it('should render popup in container', () => {
        expect(popupMock.parentNode).toBe(container)
      })

      it('should not open the popup twice', () => {
        popup.open()
        expect(containerAppendMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('#close', () => {
      const container = document.createElement('div')
      const containerRemoveChildMock = jest.spyOn(container, 'removeChild')

      it('should not remove typeform popup from the container if it was not open', () => {
        createPopup('url', { container }).close()
        expect(containerRemoveChildMock).toHaveBeenCalledTimes(0)
      })

      it('should remove typeform popup from the container', () => {
        const popup = createPopup('url', { container })
        popup.open()
        popup.close()
        expect(containerRemoveChildMock).toHaveBeenCalledTimes(1)
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
