const { setupIframeTesting } = require('../cypress-utils')

describe('Full Page Embed Widget', function () {
  const iframe = '#typeform-full'
  it('Loads correctly the Full Page widget', function () {
    cy.visit('full.html')
    setupIframeTesting(iframe)
  })
})
