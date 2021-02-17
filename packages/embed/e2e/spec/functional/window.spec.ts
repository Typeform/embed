describe('Window', () => {
  before(() => {
    cy.visit('/widget-html.html')
  })

  it('should expose `tf` on `window`', () => {
    // cy.window().should('have.property', 'tf')
    cy.window().then((win: any) => {
      expect(typeof win.tf).to.equal('object')
      expect(typeof win.tf.createWidget).to.equal('function')
      expect(typeof win.tf.createPopup).to.equal('function')
    })
  })

  it('should display widget', () => {
    cy.get('.typeform-widget iframe').should('be.visible')
    cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })
})
