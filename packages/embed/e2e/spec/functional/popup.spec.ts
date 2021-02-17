describe('Popup', () => {
  before(() => {
    cy.visit('/popup-js.html')
  })

  it('should not display popup on page load', () => {
    cy.get('.typeform-popup').should('not.exist')
  })

  it('should open popup', () => {
    cy.get('button').click()
    cy.get('.typeform-popup').should('be.visible')
    cy.get('.typeform-popup iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })

  it('should close popup', () => {
    cy.get('a.typeform-close').click()
    cy.get('.typeform-popup').should('not.exist')
  })
})
