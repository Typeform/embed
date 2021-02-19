describe('Popup', () => {
  before(() => {
    cy.visit('/popup-html.html')
  })

  it('should expose `tf` on `window`', () => {
    cy.window().then((win: any) => {
      expect(typeof win.tf).to.equal('object')
      expect(typeof win.tf.createPopup).to.equal('function')
    })
  })

  it('should not display popup on page load', () => {
    cy.get('.typeform-popup').should('not.exist')
  })

  it('should open popup', () => {
    cy.get('button').click()
    cy.get('.typeform-popup').should('be.visible')
    cy.get('.typeform-popup iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })

  it('should pass options as query param', () => {
    cy.get('.typeform-popup iframe')
      .invoke('attr', 'src')
      .should('contain', '?typeform-embed=popup-blank&typeform-source=localhost')
  })

  it('should close popup', () => {
    cy.get('a.typeform-close').click()
    cy.get('.typeform-popup').should('not.exist')
  })
})
