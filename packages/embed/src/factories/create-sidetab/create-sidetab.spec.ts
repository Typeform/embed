import { createSidetab } from './create-sidetab'

jest.useFakeTimers()

describe('create-sidetab', () => {
  describe('#createPopup', () => {
    describe('#open', () => {
      it('should open', () => {
        const sidetab = createSidetab('formId')
        sidetab.open()
        jest.runAllTimers()
        expect(document.querySelector('.typeform-sidetab-wrapper')).toBeTruthy()
      })
      // it('should render the popup', () => {
      //   const popupElement = container.querySelector('.typeform-popup') as HTMLElement
      //   const wrapper = popupElement.querySelector('.typeform-iframe-wrapper') as HTMLElement
      //   expect(popupElement).toBeTruthy()
      //   expect(popupElement.querySelector('.typeform-spinner')).toBeTruthy()
      //   expect(wrapper.querySelector('iframe')).toBeTruthy()
      //   expect(wrapper.querySelector('.typeform-close')).toBeTruthy()
      //   expect(wrapper.style.width).toBe('200px')
      //   expect(wrapper.style.height).toBe('100px')
      // })
    })
    // describe('#close', () => {
    //   it('should close', () => {
    //     const sidetab = createSidetab('formId')
    //     sidetab.close()
    //     jest.runAllTimers()
    //     expect(document.querySelector('.typeform-sidetab-wrapper')).toBeFalsy()
    //   })
    // })
    // describe('#toggle', () => {
    //   const container = document.createElement('div')
    //   const containerAppendSpy = jest.spyOn(container, 'append')
    //   const containerRemoveChildSpy = jest.spyOn(container, 'removeChild')
    //   it('should open the popup', () => {
    //     createPopup('url', { container }).toggle()
    //     jest.runAllTimers()
    //     expect(containerAppendSpy).toHaveBeenCalledTimes(1)
    //   })
    //   it('should close the popup', () => {
    //     const popup = createPopup('url', { container })
    //     popup.toggle()
    //     jest.runAllTimers()
    //     popup.toggle()
    //     jest.runAllTimers()
    //     expect(containerRemoveChildSpy).toHaveBeenCalledTimes(1)
    //   })
    // })
    // describe('#refresh', () => {
    //   const iframeReloadSpy = jest.fn()
    //   const iframeMock = {
    //     contentWindow: {
    //       location: {
    //         reload: iframeReloadSpy,
    //       },
    //     },
    //   }
    //   it('should reload iframe', () => {
    //     jest
    //       .spyOn(require('../../utils/create-iframe/create-iframe'), 'createIframe')
    //       .mockImplementation(() => iframeMock)
    //     createPopup('url', {}).refresh()
    //     jest.runAllTimers()
    //     expect(iframeReloadSpy).toHaveBeenCalledTimes(1)
    //   })
    // })
  })
})
