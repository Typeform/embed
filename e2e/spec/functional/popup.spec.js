import {
  closePopupViaButton,
  open,
  openPopup,
  closePopupViaKeyboard,
  closePopupViaButtonOnMobile,
  IFRAME_SELECTOR,
  openOnMobile
} from '../../cypress-utils'

const popupModes = {
  popup: 'Popup',
  drawer_left: 'Drawer Left',
  drawer_right: 'Drawer Right',
  popover: 'Popover'
}

Object.keys(popupModes).forEach(popupMode => {
  describe(`${popupModes[popupMode]} Embed Widget`, () => {
    describe('Desktop', () => {
      before(() => {
        open('/popup?foobar=hello')
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
        openOnMobile('/popup')
        openPopup(popupMode)
      })

      it('Closes Embed Popup clicking on close Button', () => {
        closePopupViaButtonOnMobile()
      })
    })
  })
})
