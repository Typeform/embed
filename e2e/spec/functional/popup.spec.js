import {
  closePopupViaButton,
  open,
  openPopup,
  closePopupViaKeyboard,
  closePopupViaButtonOnMobile,
  getIframe,
  IFRAME_SELECTOR, openOnMobile
} from '../../cypress-utils'

const popupModes = {
  1: 'Popup',
  2: 'Drawer Left',
  3: 'Drawer Right'
}

Object.keys(popupModes).forEach(popupMode => {
  describe(`${popupModes[popupMode]} Embed Widget`, () => {
    describe('Desktop', () => {
      before(() => {
        open('popup.html?foobar=hello')
        openPopup(popupMode)
      })

      it('Passes query string parameter', () => {
        cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
      })

      it('Closes Embed Popup clicking on the close button', () => {
        closePopupViaButton()
      })

      it('Closes Embed Popup using Keyboard', () => {
        openPopup(popupMode)
        closePopupViaKeyboard()
      })
    })

    describe('Mobile', () => {
      before(() => {
        openOnMobile('popup.html')
        openPopup(popupMode)
      })

      it('Closes Embed Popup clicking on close Button', () => {
        closePopupViaButtonOnMobile()
      })
    })
  })
})
