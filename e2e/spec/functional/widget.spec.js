import { open, testEmbeddedForm, openOnMobile, testEmbedFormOnMobile, IFRAME_SELECTOR } from '../../cypress-utils'

describe('Embed Widget in div with position:absolute on mobile', () => {
  it('Loads correctly the basic embed widget', () => {
    openOnMobile('/absolute.html')
    testEmbedFormOnMobile()
  })
})

describe('Basic Embed Widget', () => {
  describe('On Desktop', () => {
    before(() => {
      open('/widget.html')
    })

    it('Loads correctly the basic embed widget', () => {
      testEmbeddedForm()
    })

    it('Passes hidden field parameter', () => {
      cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
    })
  })

  describe('On Mobile', () => {
    before(() => {
      openOnMobile('/widget.html')
    })

    it('Loads correctly the basic embed widget', () => {
      testEmbedFormOnMobile()
    })

    it('Passes hidden field parameter', () => {
      cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
    })
  })
})

describe('Basic Embed Widget with Legacy Hidden Fields', () => {
  describe('On Desktop', () => {
    before(() => {
      open('/widget-legacy.html')
    })

    it('Loads correctly the basic embed widget', () => {
      testEmbeddedForm()
    })

    it('Passes hidden field parameter', () => {
      cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
    })
  })

  describe('On Mobile', () => {
    before(() => {
      openOnMobile('/widget-legacy.html')
    })

    it('Loads correctly the basic embed widget', () => {
      testEmbedFormOnMobile()
    })

    it('Passes hidden field parameter', () => {
      cy.get(IFRAME_SELECTOR).should('have.attr', 'src').and('match', /foobar=hello/)
    })
  })
})

describe('Full Page Embed Widget', () => {
  const iframe = '#typeform-full'

  describe('On Desktop', () => {
    before(() => {
      open('/full.html')
    })

    it('Loads correctly the Full Page widget', () => {
      open('/full.html')
      testEmbeddedForm(iframe)
    })

    it('Passes hidden field parameter', () => {
      cy.get(iframe).should('have.attr', 'src').and('match', /foobar=hello/)
    })
  })

  describe('On Mobile', () => {
    before(() => {
      openOnMobile('/full.html')
    })

    it('Loads correctly the Full Page widget', () => {
      testEmbeddedForm(iframe) // full page widget behaves the same as on desktop (no modal window)
    })

    it('Passes hidden field parameter', () => {
      cy.get(iframe).should('have.attr', 'src').and('match', /foobar=hello/)
    })
  })
})
