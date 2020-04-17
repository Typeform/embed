const { setupPopupTesting } = require('../cypress-utils')

const link = 2

describe('Drawer Embed Widget', () => {
  it('Closes Embed Drawer clicking on the close button', () => {
    setupPopupTesting({
      link
    })
  })
  it('Closes Embed Drawer using Keyboard', () => {
    setupPopupTesting({
      link,
      hasKeyboardEvent: true
    })
  })
})

describe('Drawer Embed Widget on Mobile', () => {
  it('Closes the Drawer widget clicking on close Button', () => {
    setupPopupTesting({
      link,
      isMobile: true
    })
  })
})
