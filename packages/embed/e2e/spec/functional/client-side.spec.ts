describe('Widget laoded client-side', () => {
  before(() => {
    cy.visit('/client-side.html')
  })

  it('should display widget', () => {
    cy.get('#content .typeform-widget iframe').should('be.visible')
    cy.get('#content .typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
  })

  it('should not display widget added after lib is loaded', () => {
    cy.get('#more-content .typeform-widget').should('not.exist')
  })

  it('should display only 1 widget', () => {
    cy.get('.typeform-widget iframe').should('have.length', 1)
  })

  describe('when window.tf.load() is called', () => {
    before(() => {
      cy.get('button').click()
    })

    it('should display second widget', () => {
      cy.get('#more-content .typeform-widget iframe').should('be.visible')
      cy.get('#more-content .typeform-widget iframe').invoke('attr', 'src').should('contain', 'form.typeform.com/to/')
    })

    it('should display 2 widgets now', () => {
      cy.get('.typeform-widget iframe').should('have.length', 2)
    })
  })
})
