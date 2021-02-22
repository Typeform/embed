describe('Widget', () => {
  testWidget('js')
  testWidget('html')
})

function testWidget(type = 'html') {
  describe(`Widget ${type}`, () => {
    before(() => {
      cy.visit(`/widget-${type}.html`)
    })

    it('should display widget', () => {
      cy.get('.typeform-widget iframe').should('be.visible')
      cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass options as query param', () => {
      cy.get('.typeform-widget iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=embed-widget&typeform-source=localhost&typeform-medium=unit-test')
    })

    describe(`Widget ${type} With Parameters`, () => {
      before(() => {
        cy.visit(`/widget-${type}.html?foo=foo&bar=bar&baz=baz`)
      })

      it('should display widget', () => {
        cy.get('.typeform-widget iframe').should('be.visible')
        cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
      })

      it('should pass params from options to the iframe', () => {
        cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'foo=foo&bar=bar')
      })

      it('should not pass params not in the list to the iframe', () => {
        cy.get('.typeform-widget iframe').invoke('attr', 'src').should('not.contain', 'baz=baz')
      })
    })
  })
}
