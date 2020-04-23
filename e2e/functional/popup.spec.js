const { setupPopupTesting, openAsMobile, setupPopupTestingOnMobile } = require('../cypress-utils')

const link = 1
describe('Popup Embed Widget', () => {
  it('Closes Embed Popup clicking on the close button', () => {
    setupPopupTesting({
      link
    })
  })

  it('Closes Embed Popup using Keyboard', () => {
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
