describe('Widget', () => {
  before(() => {
    cy.visit('/widget-js.html')
  })

  it('should display widget', () => {
    cy.get('.typeform-widget iframe').should('be.visible')
    cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })
})
