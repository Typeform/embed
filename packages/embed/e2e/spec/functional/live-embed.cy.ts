describe('Single Embed Code', () => {
  describe(`Should load`, () => {
    before(() => {
      cy.intercept('https://api.typeform.com/single-embed/embed-id', {
        statusCode: 200,
        body: {
          html: `<div
            id="wrapper"
            data-tf-widget="HLjqXS5W"
            data-tf-medium="demo-test"
            data-tf-transitive-search-params="foo,bar"
            data-tf-hidden="foo=foo value"
            data-tf-tracking="utm_source=facebook"
            data-tf-iframe-props="title=Foo Bar"
          ></div>`,
        },
      })
      cy.visit(`/live-embed.html?bar=transitive`)
    })

    it('should display widget', () => {
      cy.wait(500)
      cy.get('.tf-v1-widget iframe').should('be.visible')
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should pass hidden fields as hash', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', '#foo=foo+value&email=foo%40bar.com')
    })

    it('should pass transitive search params', () => {
      cy.get('.tf-v1-widget iframe').invoke('attr', 'src').should('contain', '&bar=transitive')
    })
  })
})
