describe(`Chat Popover`, () => {
  before(() => {
    cy.visit('/chat.html')
  })

  it('should display popover button on page load', () => {
    cy.get('.typeform-popover-button').should('be.visible')
  })

  it('should display unread notification on the button', () => {
    cy.get('[data-testid="typeform-popover-unread-dot"]').should('exist')
  })

  it('should open popover', () => {
    cy.get('.typeform-popover-button').click()
    cy.get('.typeform-popover-wrapper').should('be.visible')
    cy.get('.typeform-popover-wrapper iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/c/')
    cy.get('[data-testid="typeform-popover-unread-dot"]').should('not.exist')
  })

  it('should close popover', () => {
    cy.get('.typeform-popover-button').click()
    cy.get('.typeform-popover-button [data-testid="default-icon"]').should('exist')
    cy.get('.typeform-popover-button [data-testid="close-icon"]').should('not.exist')
    cy.get('.typeform-popover-wrapper').should('not.exist')
  })
})
