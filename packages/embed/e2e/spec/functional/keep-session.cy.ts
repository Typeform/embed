describe('Keep session', () => {
  const scenarios = [
    { name: 'popup', openSelector: '#popup', closeSelector: 'a.tf-v1-close' },
    { name: 'slider', openSelector: '#slider', closeSelector: 'a.tf-v1-close' },
    { name: 'popover', openSelector: 'button.tf-v1-sidetab-button', closeSelector: 'button.tf-v1-sidetab-button' },
    { name: 'sidetab', openSelector: 'button.tf-v1-popover-button', closeSelector: 'button.tf-v1-popover-button' },
  ]

  scenarios.forEach(({ name, openSelector, closeSelector }) => {
    describe(`${name} embed type`, () => {
      it(`should keep the iframe in page when ${name} modal is closed`, () => {
        cy.visit('/keep-session-html.html')

        cy.get('iframe').should('not.exist')

        cy.get(openSelector).click()

        cy.get('iframe').should('be.visible')
        cy.get('iframe').should('have.length', 1)

        cy.get(closeSelector).click()

        cy.get('iframe').should('not.be.visible')
        cy.get('iframe').should('have.length', 1)

        cy.get(openSelector).click()

        cy.get('iframe').should('be.visible')
        cy.get('iframe').should('have.length', 1)
      })
    })
  })
})
