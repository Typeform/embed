describe('Single Embed Code (EU Region)', () => {
  describe(`Should load`, () => {
    before(() => {
      cy.intercept('https://api.typeform.eu/single-embed/01JSXVEN52DVHSX0NDQAJNVAZ4', {
        statusCode: 200,
        body: {
          html: `<div
            id="wrapper"
            data-tf-domain="form.typeform.eu"
            data-tf-widget="Pq5DjtOF"
            data-tf-medium="demo-test"
            data-tf-transitive-search-params="foo,bar"
            data-tf-hidden="foo=foo value"
            data-tf-tracking="utm_source=facebook"
            data-tf-iframe-props="title=Foo Bar"
          ></div>`,
        },
      })
      cy.visit(`/live-embed-eu.html?bar=transitive`)
    })

    it('should display widget', () => {
      cy.wait(500)
      cy.get('.tf-v1-widget iframe').should('be.visible')
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.eu/to/')
    })

    it('should pass hidden fields as hash', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', '#foo=foo+value&email=foo%40bar.com')
    })

    it('should pass transitive search params', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', '&bar=transitive')
    })
  })
})
