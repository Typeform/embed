describe('Widget', () => {
  testWidget('/widget-html.html', 'html')
  testWidget('/widget-js.html', 'javascript')
  testWidget('/', 'server-side rendering')
})

function testWidget(path: string, title: string) {
  describe(`Widget - ${title}`, () => {
    before(() => {
      cy.visit(`${path}?foo=foo&bar=bar&baz=baz`)
    })

    it('should display widget', () => {
      cy.get('.typeform-widget iframe').should('be.visible')
      cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass options as query param', () => {
      cy.get('.typeform-widget iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=embed-widget&typeform-source=localhost&typeform-medium=demo' + '-test')
    })

    it('should pass params from options to the iframe', () => {
      cy.get('.typeform-widget iframe').invoke('attr', 'src').should('contain', 'foo=foo&bar=bar')
    })

    it('should not pass params not in the list to the iframe', () => {
      cy.get('.typeform-widget iframe').invoke('attr', 'src').should('not.contain', 'baz=baz')
    })
  })
}
