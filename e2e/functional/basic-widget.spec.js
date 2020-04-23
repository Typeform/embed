const { setupIframeTesting, openAsMobile, setupEmbedOnMobile } = require('../cypress-utils')

describe('Basic Embed Widget', function () {
  const iframe = '[data-qa="iframe"]'
  it('Loads correctly the basic embed widget', function () {
    cy.visit('widget.html')
    setupIframeTesting(iframe)
  })
})

describe('Basic Embed Widget on Mobile', function () {
  it('Loads correctly the basic embed widget', function () {
    openAsMobile('widget.html')
    setupEmbedOnMobile()
  })
})
