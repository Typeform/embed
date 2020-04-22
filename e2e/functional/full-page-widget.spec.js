const { setupIframeTesting, openAsMobile } = require('../cypress-utils')

describe('Full Page Embed Widget', function () {
  const iframe = '#typeform-full'
  it('Loads correctly the Full Page widget', function () {
    cy.visit('full.html')
    setupIframeTesting(iframe)
  })
})

describe('Full Page Embed Widget on Mobile', function () {
  const iframe = '#typeform-full'
  it('Loads correctly the Full Page widget', function () {
    openAsMobile('full.html')
    setupIframeTesting(iframe)
  })
})
