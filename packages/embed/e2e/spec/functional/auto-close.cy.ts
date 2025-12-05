describe('Auto Close', () => {
  it('JS - should auto close the form after submit', () => {
    const autoCloseTime = 2000

    cy.visit('/autoclose.html')

    cy.get('#button-js').click()

    cy.get('iframe').should('be.visible')

    cy.get('iframe').then(($iframe) => {
      const transitionTime = 1000
      const $body = $iframe.contents().find('body')

      // Click the "10" rating option (NPS question)
      cy.wrap($body).find('button').filter(':contains("10")').first().click()

      cy.wait(transitionTime)

      cy.wrap($body).contains('button', 'Submit').click()
    })

    cy.wait(autoCloseTime)

    cy.get('iframe').should('not.exist')
  })

  it('HTML - should auto close the form after submit', () => {
    const autoCloseTime = 500

    cy.visit('/autoclose.html')

    cy.get('#button-html').click()

    cy.get('iframe').should('be.visible')

    cy.get('iframe').then(($iframe) => {
      const transitionTime = 1000
      const $body = $iframe.contents().find('body')

      // Click the "10" rating option (NPS question)
      cy.wrap($body).find('button').filter(':contains("10")').first().click()

      cy.wait(transitionTime)

      cy.wrap($body).contains('button', 'Submit').click()
    })

    cy.wait(autoCloseTime)

    cy.get('iframe').should('not.exist')
  })
})
