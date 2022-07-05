describe(`Chat Popover`, () => {
  before(() => {
    cy.visit('/chat.html')
  })

  it('should display popover button on page load', () => {
    cy.get('.tf-v1-popover-button').should('be.visible')
  })

  it('should display unread notification on the button', () => {
    cy.get('[data-testid="tf-v1-popover-unread-dot"]').should('exist')
  })

  it('should open popover', () => {
    cy.get('.tf-v1-popover-button').click()
    cy.get('.tf-v1-popover-wrapper').should('be.visible')
    cy.get('.tf-v1-popover-wrapper iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/c/')
    cy.get('[data-testid="tf-v1-popover-unread-dot"]').should('not.exist')
  })

  it('should close popover', () => {
    cy.get('.tf-v1-popover-button').click()
    cy.get('.tf-v1-popover-button [data-testid="default-icon"]').should('exist')
    cy.get('.tf-v1-popover-button [data-testid="close-icon"]').should('not.exist')
    cy.get('.tf-v1-popover-wrapper').should('not.exist')
  })
})
