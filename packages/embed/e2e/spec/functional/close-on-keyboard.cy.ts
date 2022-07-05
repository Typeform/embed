describe('Close on Keyboard Esc Event', () => {
  it('Should close the form with keyboard event inside the Iframe', () => {
    cy.visit('/popup-html.html')

    cy.get('#button').click()

    cy.get('iframe').should('be.visible')

    cy.get('iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body')
      // interact with Iframe
      cy.wrap($body).find('[data-value-number="2"]').click()
      // close with keyboard inside iframe
      cy.wrap($body).find('textarea').type('{esc}')
    })

    cy.get('iframe').should('not.exist')
  })

  it('Should close the form with keyboard event from host window', () => {
    cy.visit('/popup-html.html')

    cy.get('#button').click()

    cy.get('iframe').should('be.visible')
    // close with keyboard from host page
    cy.get('body').click().trigger('keydown', { key: 27, code: 'Escape', release: false })

    cy.get('iframe').should('not.exist')
  })
})
