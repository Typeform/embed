import {
  closePopupViaButton,
  openPopup,
  closePopupViaKeyboard,
  openPopupOnMobile,
  closePopupViaButtonOnMobile,
  getIframe,
  IFRAME_SELECTOR
} from '../cypress-utils'

const popupModes = {
  1: 'Popup',
  2: 'Drawer',
  3: 'Drawer Right'
}

Object.keys(popupModes).forEach(popupMode => {
  describe(`${popupModes[popupMode]} Embed Widget`, () => {
    describe('Desktop', () => {
      before(() => {
        openPopup(popupMode)
      })

      it('Passes query string parameter', () => {
        cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
      })

      it('Displays correct hidden field value', () => {
        getIframe(
          IFRAME_SELECTOR,
          iframeBody => iframeBody.find('[data-qa~="block-title"]').first().should('have.text', 'Full Name (hello)')
        )
      })

      it('Closes Embed Popup clicking on the close button', () => {
        closePopupViaButton()
      })

      it('Closes Embed Popup using Keyboard', () => {
        cy.get(`[data-mode="${popupMode}"]`).click()
        closePopupViaKeyboard()
      })
    })

    describe('Mobile', () => {
      before(() => {
        openPopupOnMobile(popupMode)
      })

      it('Closes Embed Popup clicking on close Button', () => {
        closePopupViaButtonOnMobile()
      })
    })
  })
})
