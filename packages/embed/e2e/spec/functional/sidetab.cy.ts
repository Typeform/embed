describe('Sidetab', () => {
  testSidetab('/sidetab-html.html', 'html')
  testSidetab('/sidetab-js.html', 'javascript')
  testSidetab('/sidetab', 'server-side rendering')
})

function testSidetab(path: string, title: string) {
  describe(`Sidetab - ${title}`, () => {
    before(() => {
      cy.visit(path)
    })

    it('should display sidetab button on page load', () => {
      cy.get('.tf-v1-sidetab-button').should('be.visible')
      cy.get('.tf-v1-sidetab-button [data-testid="default-icon"]').should('be.visible')
      cy.get('.tf-v1-sidetab-button').contains('open sidetab')
    })

    it('should not display sidetab on page load', () => {
      cy.get('.tf-v1-sidetab-wrapper').should('not.exist')
    })

    it('should open sidetab', () => {
      cy.get('.tf-v1-sidetab-button').click()
      cy.get('.tf-v1-sidetab-wrapper').should('be.visible')
      cy.get('.tf-v1-sidetab-wrapper iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
      cy.get('.tf-v1-sidetab-button [data-testid="default-icon"]').should('not.exist')
      cy.get('.tf-v1-sidetab-button [data-testid="tf-v1-sidetab-button-icon"]').should('exist')
    })

    it('should pass options as query param', () => {
      cy.get('.tf-v1-sidetab-wrapper iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=popup-side-panel&typeform-source=localhost&typeform-medium=demo-test')
    })

    it('should pass hidden fields as hash', () => {
      cy.get('.tf-v1-sidetab-wrapper iframe').invoke('attr', 'src').should('contain', '#foo=foo+value&bar=bar+value')
    })

    it('should close sidetab', () => {
      cy.get('.tf-v1-sidetab-button').click()
      cy.get('.tf-v1-sidetab-button [data-testid="default-icon"]').should('exist')
      cy.get('.tf-v1-sidetab-button [data-testid="tf-v1-sidetab-button-icon"]').should('not.exist')
      cy.get('.tf-v1-sidetab-wrapper').should('not.exist')
    })
  })
}
