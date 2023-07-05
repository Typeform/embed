import { open, openOnMobile } from '../../cypress-utils'

describe('Embed Widget', () => {
  describe('Desktop', () => {
    before(() => {
      open('/widget-js.html')
    })

    it('Basic Embed Widget - Desktop', () => {
      cy.vrt('Basic Embed Widget - Desktop')
    })
  })

  describe('Mobile', () => {
    describe('with fullscreen view', () => {
      before(() => {
        openOnMobile('/widget-js.html')
      })

      it('Basic Embed Widget - Mobile fullscreen view', () => {
        cy.get('iframe').then(($iframe) => {
          const $body = $iframe.contents().find('body')
          cy.wrap($body).find('[data-qa="start-button"]').click()
        })
        cy.wait(1000)
        cy.vrt('Basic Embed Widget - Mobile fullscreen view')
      })
    })

    describe('with inline view', () => {
      before(() => {
        openOnMobile('/widget-inline.html')
      })

      it('Basic Embed Widget - Mobile inline view', () => {
        cy.wait(1000)
        cy.vrt('Basic Embed Widget - Mobile inline view')
      })
    })
  })
})
