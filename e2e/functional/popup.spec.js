const { setupPopupTesting } = require('../cypress-utils')

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

describe('Popup Embed Widget on Mobile', () => {
  it('Closed the popup widget clicking on close Button', () => {
    setupPopupTesting({
      link,
      isMobile: true
    })
  })
})
