import { testEmbeddedForm, openOnMobile, testEmbedFormOnMobile } from '../cypress-utils'

describe('Embed Widget in div with position:absolute on mobile', () => {
  it('Loads correctly the basic embed widget', () => {
    openOnMobile('absolute.html')
    testEmbedFormOnMobile()
  })
})

describe('Basic Embed Widget', function () {
  describe('On Desktop', function () {
    it('Loads correctly the basic embed widget', function () {
      cy.visit('widget.html')
      testEmbeddedForm()
    })
  })

  describe('On Mobile', function () {
    it('Loads correctly the basic embed widget', function () {
      openOnMobile('widget.html')
      testEmbedFormOnMobile()
    })
  })
})

describe('Full Page Embed Widget', function () {
  const iframe = '#typeform-full'

  describe('On Desktop', function () {
    it('Loads correctly the Full Page widget', function () {
      cy.visit('full.html')
      testEmbeddedForm(iframe)
    })
  })

  describe('On Mobile', function () {
    it('Loads correctly the Full Page widget', function () {
      openOnMobile('full.html')
      testEmbeddedForm(iframe)
    })
  })
})
