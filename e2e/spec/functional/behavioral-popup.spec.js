import { IFRAME_SELECTOR, open } from '../../cypress-utils'

const pages = {
  '-code': 'embed code',
  '-api': 'API',
}

const getPageUrl = (name, suffix, query = '') => {
  return `/behavioral${suffix}/${name}${suffix}.html?${query}`
}

Object.keys(pages).forEach((pageSuffix) => {
  describe(`Behavioral Embeds using ${pages[pageSuffix]}`, () => {
    describe('Open: exit', () => {
      before(() => {
        open(getPageUrl('exit', pageSuffix, 'threshold=100'))
      })

      it('should not display the popup on mouse movement in the area downwards', () => {
        cy.get('body')
          .trigger('mousemove', { clientY: 50 })
          .trigger('mousemove', { clientY: 55 })
          .trigger('mousemove', { clientY: 60 })
        cy.get(IFRAME_SELECTOR).should('not.exist')
      })

      it('should not display the popup on mouse movement outside the area', () => {
        cy.get('body').trigger('mousemove', { clientY: 120 }).trigger('mousemove', { clientY: 101 })
        cy.get(IFRAME_SELECTOR).should('not.exist')
      })

      it('should display the popup on mouse movement in the area upwards', () => {
        cy.get('body')
          .trigger('mousemove', { clientY: 90 })
          .trigger('mousemove', { clientY: 80 })
          .trigger('mousemove', { clientY: 70 })
        cy.get(IFRAME_SELECTOR).should('be.visible')
      })
    })

    describe('Open: load', () => {
      before(() => {
        open(getPageUrl('load', pageSuffix))
      })

      it('should display the popup', () => {
        cy.get(IFRAME_SELECTOR).should('be.visible')
      })
    })

    describe('Open: scroll', () => {
      before(() => {
        open(getPageUrl('scroll', pageSuffix, 'percent=30'))
      })

      it('should not display the popup', () => {
        cy.get(IFRAME_SELECTOR).should('not.exist')
      })

      it('should display the popup after scrolling down', () => {
        cy.scrollTo(0, 950) // 950px is over 30% of the page height
        cy.get(IFRAME_SELECTOR).should('be.visible')
      })

      it('should display the popup immediately after reloading the page on the same position', () => {
        if (Cypress.isBrowser('chrome')) {
          cy.reload()
          cy.get(IFRAME_SELECTOR).should('be.visible')
        }
      })
    })

    describe('Open: time', () => {
      const timeout = 1000 // the popup is opened after 1 seconds

      before(() => {
        open(getPageUrl('time', pageSuffix, `ms=${1000}`))
      })

      it('should not display the popup', () => {
        cy.get(IFRAME_SELECTOR).should('not.exist')
      })

      it('should display the popup after 1 second', () => {
        cy.wait(timeout)
        cy.get(IFRAME_SELECTOR).should('be.visible')
      })
    })
  })
})

describe('Open: load (via embed code)', () => {
  before(() => {
    open(getPageUrl('load', '-code'))
  })

  it('should display close button', () => {
    cy.get('.typeform-share > .icon > img[data-qa="popup-close-button"]').should('be.visible')
    cy.get('.typeform-share > .icon > svg').should('not.be.visible')
  })

  describe('when popup is closed', () => {
    before(() => {
      cy.get('.typeform-share').click()
    })

    it('should display the popup', () => {
      cy.get(IFRAME_SELECTOR).should('not.be.visible')
    })

    it('should display original icon', () => {
      cy.get('.typeform-share > .icon > img[data-qa="popup-close-button"]').should('not.be.visible')
      cy.get('.typeform-share > .icon > svg').should('be.visible')
    })
  })
})
