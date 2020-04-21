const { setupPopupTesting, openAsMobile, setupPopupTestingOnMobile } = require('../cypress-utils')

const link = 3
describe('Right Drawer Embed Widget handled with close button', () => {
  it('Closes Embed Drawer clicking on the close button', () => {
    setupPopupTesting({
      link
    })
  })

  it('Closes Embed Right Drawer using Keyboard', () => {
    setupPopupTesting({
      link,
      hasKeyboardEvent: true
    })
  })
})

describe('Drawer Embed Widget on Mobile', () => {
  it('Closes the Drawer widget clicking on close Button', () => {
    openAsMobile('popup.html')
    cy.get(`[data-mode="${link}"]`).click()
    setupPopupTestingOnMobile()
  })
})
