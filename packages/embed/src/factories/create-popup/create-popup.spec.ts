import { createPopup } from './create-popup'

describe('create-popup', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      const container = document.createElement('div')
      const containerAppendMock = jest.spyOn(container, 'append')

      it('should append typeform popup to the container', () => {
        createPopup('url', { container }).open()
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

      jest.spyOn(require('../../utils/create-iframe/create-iframe'), 'createIframe').mockImplementation(() => ({
        contentWindow: {
          location: {
            reload: iframeReloadSpy,
          },
        },
      }))

      it('should reload iframe', () => {
        createPopup('url', {}).refresh()
        expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
