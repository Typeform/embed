describe('Popup', () => {
  it('should open popup', () => {
    cy.visit('/iframe.html?id=embed-popup--popup&viewMode=story')
    cy.get('.typeform-popup').should('not.be.visible')
    cy.get('button').click()
    cy.get('.typeform-popup').should('be.visible')
    cy.get('.typeform-popup iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })
})
