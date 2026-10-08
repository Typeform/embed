import { open } from '../../cypress-utils'

describe('Desktop Embeds', () => {
  it('Popup Desktop', () => {
    open('/popup-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Popup Desktop')
  })

  it('Popover Desktop', () => {
    open('/popover-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Popover Desktop')
  })

  it('Slider Right Desktop', () => {
    open('/slider-js.html')
    cy.get('#button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Slider Right Desktop')
  })

  it('Slider Left Desktop', () => {
    open('/slider-js.html')
    cy.get('#button-left').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Slider Left Desktop')
  })

  it('Sidetab Desktop', () => {
    open('/sidetab-js.html')
    cy.get('button.tf-v1-sidetab-button').click({ force: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Sidetab Desktop')
  })
})
