import { open } from '../../cypress-utils'

// Closed states: the launcher UI is owned by the embed SDK, not by the form.
describe('Embed Launchers', () => {
  it('Popover Launcher', () => {
    open('/popover-js.html')
    cy.get('[data-testid="tf-v1-popover-button"]').should('be.visible')
    cy.vrt('Popover Launcher', { waitForForms: false })
  })

  it('Popover Custom Icon Launcher', () => {
    open('/popover-js.html')
    cy.get('#button-custom-icon').click({ force: true })
    cy.get('[data-testid="tf-v1-popover-button"] img').should(($img) => {
      expect(($img[0] as HTMLImageElement).naturalWidth, 'custom icon loaded').to.be.greaterThan(0)
    })
    cy.vrt('Popover Custom Icon Launcher', { waitForForms: false })
  })

  it('Sidetab Button', () => {
    open('/sidetab-js.html')
    cy.get('button.tf-v1-sidetab-button').should('be.visible')
    cy.vrt('Sidetab Button', { waitForForms: false })
  })
})
