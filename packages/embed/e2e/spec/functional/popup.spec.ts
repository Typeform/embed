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
      cy.get('.typeform-popup').should('not.exist')
    })

    it('should open popup', () => {
      cy.get('#button').click()
      cy.get('.typeform-popup').should('be.visible')
      cy.get('.typeform-popup iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass options as query param', () => {
      cy.get('.typeform-popup iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=popup-blank&typeform-source=localhost&typeform-medium=demo-test')
    })

    it('should close popup', () => {
      cy.get('a.typeform-close').click()
      cy.get('.typeform-popup').should('not.exist')
    })
  })
}
