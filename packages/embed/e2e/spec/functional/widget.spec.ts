describe('Widget', () => {
  it('should display widget', () => {
    cy.visit('/iframe.html?id=embed-widget--widget&viewMode=story')
    cy.get('.typeform-widget iframe').should('be.visible')
    cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })
})
