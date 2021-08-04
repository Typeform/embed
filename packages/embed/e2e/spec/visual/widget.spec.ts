import { open, openOnMobile } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Embed Widget', () => {
  describe('Desktop', () => {
    before(() => {
      open('/widget-js.html')
    })

    it('Basic Embed Widget - Desktop', () => {
      eyesCheckDesktop('Embed')
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
        eyesCheckMobile('Embed')
      })
    })

    describe('with inline view', () => {
      before(() => {
        openOnMobile('/widget-inline.html')
      })

      it('Basic Embed Widget - Mobile inline view', () => {
        cy.wait(1000)
        eyesCheckMobile('Embed')
      })
    })
  })
})
