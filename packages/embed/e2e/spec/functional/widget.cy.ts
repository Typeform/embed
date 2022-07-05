import { openOnMobile } from '../../cypress-utils'

describe('Widget', () => {
  testWidget('/widget-html.html', 'html')
  testWidget('/widget-js.html', 'javascript')
  testWidget('/', 'server-side rendering')
})

describe('Widget - Mobile', () => {
  testMobile('/widget-html.html', 'html')
  testMobile('/widget-js.html', 'javascript')
})

function testWidget(path: string, title: string) {
  describe(`Widget - ${title}`, () => {
    before(() => {
      cy.visit(`${path}?foo=foo&bar=bar&baz=baz`)
    })

    it('should display widget', () => {
      cy.get('.tf-v1-widget iframe').should('be.visible')
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass options as query param', () => {
      cy.get('.tf-v1-widget iframe')
        .invoke('attr', 'src')
        .should('contain', 'typeform-embed=embed-widget&typeform-source=localhost&typeform-medium=demo-test')
    })

    it('should pass hidden fields as hash', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', '#foo=foo+value&bar=bar+value')
    })

    it('should pass params from options to the iframe', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', 'foo=foo&bar=bar')
    })

    it('should not pass params not in the list to the iframe', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('not.contain', 'baz=baz')
    })

    it('should pass additional iframe props', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'title').should('equal', 'Foo Bar')
    })
  })
}

function testMobile(path: string, title: string) {
  describe(`Widget - ${title}`, () => {
    before(() => {
      openOnMobile(`${path}?foo=foo&bar=bar&baz=baz`)
    })

    it('should reset the form when closing it', () => {
      cy.get('iframe').then(($iframe) => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body).find('[data-qa="start-button"]').click()
        cy.get('.tf-v1-widget-close').click()
      })
      cy.wait(500)
      cy.get('iframe').then(($iframe) => {
        const $body = $iframe.contents().find('body')
        cy.wrap($body).find('[data-qa="start-button"]').should('exist')
      })
    })
  })
}
