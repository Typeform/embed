describe('Popup', () => {
  testPopup('/popup-html.html', 'html')
  testPopup('/popup-js.html', 'javascript')
  testPopup('/popup', 'server-side rendering')
})

function testPopup(path: string, title: string) {
  describe(`Popup - ${title}`, () => {
    before(() => {
      cy.visit(path)
    })

    it('should not display popup on page load', () => {
      cy.get('.tf-v1-popup').should('not.exist')
    })

    it('should open popup', () => {
      cy.get('button').first().click()
      cy.get('.tf-v1-popup').should('be.visible')
      cy.get('.tf-v1-popup iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass options as query param', () => {
      cy.get('.tf-v1-popup iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=popup-blank&typeform-source=localhost&typeform-medium=demo-test')
    })

    it('should pass hidden fields as hash', () => {
      cy.get('.tf-v1-popup iframe').invoke('attr', 'src').should('contain', '#foo=foo+value&bar=bar+value')
    })

    it('should close popup', () => {
      cy.get('a.tf-v1-close').click()
      cy.get('.tf-v1-popup').should('not.exist')
    })
  })
}
