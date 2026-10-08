import { openWithEmbed } from '../../cypress-utils'

// Options that change how the form looks inside the embed. The page has a striped background so
// transparency is visible. None of these options are covered by the renderer's own tests.
describe('Embed Options', () => {
  it('Widget Opacity 0', () => {
    openWithEmbed('createWidget', 'HLjqXS5W', { opacity: 0 })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Widget Opacity 0')
  })

  it('Widget Opacity 50', () => {
    openWithEmbed('createWidget', 'HLjqXS5W', { opacity: 50 })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Widget Opacity 50')
  })

  it('Popup Hide Footer', () => {
    openWithEmbed('createPopup', 'HLjqXS5W', { hideFooter: true }, { open: true })
    cy.get('[data-testid="iframe"]').should('be.visible')
    cy.vrt('Popup Hide Footer')
  })
})
