const { setupIframeTesting } = require('../cypress-utils')

describe('Basic Embed Widget', function () {
  const iframe = '[data-qa="iframe"]'
  it('Loads correctly the basic embed widget', function () {
    cy.visit('widget.html')
    setupIframeTesting(iframe)
  })
})
