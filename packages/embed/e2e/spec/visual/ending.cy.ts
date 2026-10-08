import { openWithEmbed } from '../../cypress-utils'

// Finds an element inside the form iframe, retrying until it exists (the iframe document is replaced while loading).
const inForm = (selector: string) =>
  cy
    .get('[data-testid="iframe"]', { timeout: 15000 })
    .should(($iframe) => {
      expect($iframe.contents().find(selector), selector).to.have.length.greaterThan(0)
    })
    .then(($iframe) => cy.wrap($iframe.contents().find(selector)))

describe('Embed Screens', () => {
  // The sandbox option avoids recording a real response in the test form.
  it('Widget Thank You Screen', () => {
    openWithEmbed('createWidget', 'HLjqXS5W', { enableSandbox: true })
    inForm('button[role="radio"][value="5"]').click()
    inForm('textarea').type('Visual test')
    inForm('button:contains("Submit")').first().click()
    inForm(':contains("Thanks for completing")')
    cy.vrt('Widget Thank You Screen')
  })
})
