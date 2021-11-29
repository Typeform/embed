describe('Slider', () => {
  testSlider('/slider-html.html', 'html')
  testSlider('/slider-js.html', 'javascript')
  testSlider('/slider', 'server-side rendering')
})

function testSlider(path: string, title: string) {
  describe(`Slider - ${title}`, () => {
    before(() => {
      cy.visit(`${path}?foo=foo&bar=bar&baz=baz`)
    })

    it('should not display popup on page load', () => {
      cy.get('.tf-v1-slider').should('not.exist')
    })

    it('should open slider', () => {
      cy.get('button').first().click()
      cy.get('.tf-v1-slider').should('be.visible')
      cy.get('.tf-v1-slider iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass options as query param', () => {
      cy.get('.tf-v1-slider iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=popup-drawer&typeform-source=localhost&typeform-medium=demo-test')
    })

    it('should close slider', () => {
      cy.get('a.tf-v1-close').click()
      cy.get('.tf-v1-slider').should('not.exist')
    })
  })
}
