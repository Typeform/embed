import { open, openOnMobile, startWidgetOnMobile, waitForAnimations } from '../../cypress-utils'

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
        startWidgetOnMobile()
        cy.vrt('Basic Embed Widget - Mobile fullscreen view')
      })
    })

    describe('with inline view', () => {
      before(() => {
        openOnMobile('/widget-inline.html')
      })

      it('Basic Embed Widget - Mobile inline view', () => {
        waitForAnimations()
        cy.vrt('Basic Embed Widget - Mobile inline view')
      })
    })
  })
})
