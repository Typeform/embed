import { createPopover, Popover } from './create-popover'

describe('create-popover', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      let popover: Popover
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const popupMock = document.createElement('div')

      beforeAll(() => {
        jest.spyOn(require('./elements/build-popover'), 'buildPopover').mockImplementation(() => popupMock)
        popover = createPopover('url', { container })
        popover.open()
      })

      it('should append typeform popover to the container', () => {
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
        expect(containerAppendSpy).toHaveBeenCalledWith(popupMock)
      })

      it('should render popover in container', () => {
        expect(popupMock.parentNode).toBe(container)
      })

      it('should not open the popover twice', () => {
        popover.open()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('#close', () => {
      const container = document.createElement('div')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')

      it('should not remove typeform popover from the container if it was not open', () => {
        createPopover('url', { container }).close()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(0)
      })

      it('should remove typeform popover from the container', () => {
        const popover = createPopover('url', { container })
        popover.open()
        popover.close()
        expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('#toggle', () => {
      const container = document.createElement('div')
      const containerAppendSpy = jest.spyOn(container, 'append')
      const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')
      const popupMock = document.createElement('div')

      beforeAll(() => {
        jest.spyOn(require('./elements/build-popover'), 'buildPopover').mockImplementation(() => popupMock)
      })

      it('should open the popover', () => {
        createPopover('url', { container }).toggle()
        expect(containerAppendSpy).toHaveBeenCalledTimes(1)
        expect(containerAppendSpy).toHaveBeenCalledWith(popupMock)
        expect(popupMock.parentNode).toBe(container)
      })

      it('should close the popover', () => {
        const popover = createPopover('url', { container })
        popover.toggle()
        popover.toggle()
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
        createPopover('url', {}).refresh()
        expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
