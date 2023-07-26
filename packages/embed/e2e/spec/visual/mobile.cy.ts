import { openOnMobile } from '../../cypress-utils'

describe('Mobile Embeds', () => {
  it('Popover fullscreen', () => {
    openOnMobile('/popover-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Popover Mobile')
  })

  it('Popup fullscreen', () => {
    openOnMobile('/popup-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Popup Mobile')
  })

  it('Sidetab fullscreen', () => {
    openOnMobile('/sidetab-js.html')
    cy.get('button.tf-v1-sidetab-button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Sidetab Mobile')
  })

  it('Slider fullscreen', () => {
    openOnMobile('/slider-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Slider Mobile')
  })
})
