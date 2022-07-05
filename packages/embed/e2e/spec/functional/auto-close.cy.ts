describe('Auto Close', () => {
  it('JS - should auto close the form after submit', () => {
    const autoCloseTime = 2000

    cy.visit('/autoclose.html')

    cy.get('#button-js').click()

    cy.get('iframe').should('be.visible')

    cy.get('iframe').then(($iframe) => {
      const transitionTime = 1000
      const $body = $iframe.contents().find('body')

      cy.wrap($body).find('[data-qa-index="10"]').click()

      cy.wait(transitionTime)

      cy.wrap($body).find('[data-qa="submit-button deep-purple-submit-button"]').last().click()
    })

    cy.wait(autoCloseTime)

    cy.get('iframe').should('not.exist')
  })

  it('HTML - should auto close the form after submit', () => {
    const autoCloseTime = 100

    cy.visit('/autoclose.html')

    cy.get('#button-html').click()

    cy.get('iframe').should('be.visible')

    cy.get('iframe').then(($iframe) => {
      const transitionTime = 1000
      const $body = $iframe.contents().find('body')

      cy.wrap($body).find('[data-qa-index="10"]').click()

      cy.wait(transitionTime)

      cy.wrap($body).find('[data-qa="submit-button deep-purple-submit-button"]').last().click()
    })

    cy.wait(autoCloseTime)

    cy.get('iframe').should('not.exist')
  })
})
