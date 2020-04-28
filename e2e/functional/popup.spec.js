import {
  closePopupViaButton,
  openPopup,
  closePopupViaKeyboard,
  openPopupAsMobile,
  closePopupViaButtonOnMobile, getIframeBody, IFRAME
} from '../cypress-utils'

const popupModes = {
  1: 'Popup',
  2: 'Drawer',
  3: 'Drawer Right'
}

Object.keys(popupModes).forEach(popupMode => {
  describe(`${popupModes[popupMode]} Embed Widget`, () => {
    describe('Desktop', () => {
      beforeEach(() => {
        openPopup(popupMode)
      })

      it('Passes query string parameter', () => {
        cy.get('[data-qa="iframe"]').should('have.attr', 'src').and('match', /foobar=hello/)
      })

      it('Displays correct hidden field value', () => {
        if (Cypress.isBrowser('chrome')) {
          cy.wait(2000).then(() => {
            getIframeBody(IFRAME).then(($body) => {
              cy.wrap($body).find('[data-qa~="block-title"]').first().should('have.text', 'Full Name (hello)')
            })
          })
        }
      })

      it('Closes Embed Popup clicking on the close button', () => {
        closePopupViaButton()
      })

      it('Closes Embed Popup using Keyboard', () => {
        closePopupViaKeyboard()
      })
    })

    describe('Mobile', () => {
      beforeEach(() => {
        openPopupAsMobile(popupMode)
      })

      it('Closes the Drawer widget clicking on close Button', () => {
        closePopupViaButtonOnMobile()
      })
    })
  })
})
