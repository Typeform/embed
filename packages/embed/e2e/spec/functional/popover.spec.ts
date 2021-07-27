describe('Popup', () => {
  testPopover('/popover-html.html', 'html')
  testPopover('/popover-js.html', 'javascript')
  testPopover('/popover', 'server-side rendering')
})

function testPopover(path: string, title: string) {
  describe(`Popover - ${title}`, () => {
    before(() => {
      cy.visit(path)
    })

    it('should display popover button on page load', () => {
      cy.get('.typeform-popover-button').should('be.visible')
      cy.get('.typeform-popover-button [data-testid="default-icon"]').should('be.visible')
    })

    it('should not display popover on page load', () => {
      cy.get('.typeform-popover-wrapper').should('not.exist')
    })

    it('should open popover', () => {
      cy.get('.typeform-popover-button').click()
      cy.get('.typeform-popover-wrapper').should('be.visible')
      cy.get('.typeform-popover-wrapper iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
      cy.get('.typeform-popover-button [data-testid="default-icon"]').should('not.exist')
      cy.get('.typeform-popover-button [data-testid="typeform-popover-button-icon"]').should('exist')
    })

    it('should pass options as query param', () => {
      cy.get('.typeform-popover-wrapper iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=popup-popover&typeform-source=localhost&typeform-medium=demo-test')
    })

    it('should pass hidden fields as hash', () => {
      cy.get('.typeform-popover-wrapper iframe').invoke('attr', 'src').should('contain', '#foo=foo+value&bar=bar+value')
    })

    it('should close popover', () => {
      cy.get('.typeform-popover-button').click()
      cy.get('.typeform-popover-button [data-testid="default-icon"]').should('exist')
      cy.get('.typeform-popover-button [data-testid="typeform-popover-button-icon"]').should('not.exist')
      cy.get('.typeform-popover-wrapper').should('not.exist')
    })
  })
}
