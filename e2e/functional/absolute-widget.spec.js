import { getIframeBody, openAsMobile } from '../cypress-utils'

describe('Embed Widget in div with position:absolute on mobile', () => {
  it('Loads correctly the basic embed widget', () => {
    openAsMobile('absolute.html')

    if (Cypress.isBrowser('chrome')) { // inside of an iframe is testable only in Chrome
      getIframeBody('[data-qa="iframe"]').find('[data-qa="start-button"]').should('have.text', 'Start').click()

      cy.wait(1500).then(() => {
        cy.get('[data-qa="close-button-mobile"]').should('be.visible').click()
      })
    } else {
      cy.get('[data-qa="iframe"]').should('be.visible')
    }
  })
})
