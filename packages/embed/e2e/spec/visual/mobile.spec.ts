import { openOnMobile } from '../../cypress-utils'
import { eyesCheckMobile } from '../../applitools-utils'

describe('Mobile Embeds', () => {
  it('Popover fullscreen', () => {
    openOnMobile('/popover-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    eyesCheckMobile('Popover Mobile')
  })

  it('Popup fullscreen', () => {
    openOnMobile('/popup-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    eyesCheckMobile('Popup Mobile')
  })

  it('Sidetab fullscreen', () => {
    openOnMobile('/sidetab-js.html')
    cy.get('button.typeform-sidetab-button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    eyesCheckMobile('Sidetab Mobile')
  })

  it('Slider fullscreen', () => {
    openOnMobile('/slider-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    eyesCheckMobile('Slider Mobile')
  })
})
