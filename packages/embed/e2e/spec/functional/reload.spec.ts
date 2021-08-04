describe('Reload and reload methods', () => {
  describe('window.tf.load()', () => {
    it('should load the form', () => {
      cy.visit('/widget-html.html')

      cy.get('iframe').should('be.visible')
      cy.get('iframe').should('have.length', 1)
      cy.get('iframe')
        .first()
        .invoke('attr', 'src')
        .should('match', /form\.typeform\.com\/to\/moe6aa/)

      cy.window().then((win) => {
        win.document.querySelector('body')!.innerHTML += '<div data-tf-widget="jAJ5qj"></div>'
        ;(win as any).tf.load()

        cy.get('iframe').should('have.length', 2)

        cy.get('iframe')
          .first()
          .invoke('attr', 'src')
          .should('match', /form\.typeform\.com\/to\/moe6aa/)
        cy.get('iframe')
          .eq(1)
          .invoke('attr', 'src')
          .should('match', /form\.typeform\.com\/to\/jAJ5qj/)
      })
    })
  })

  describe('window.tf.reload()', () => {
    it('should reload form', () => {
      cy.visit('/widget-html.html')

      cy.get('iframe').should('be.visible')
      cy.get('iframe').should('have.length', 1)

      cy.get('iframe').then(($iframe) => {
        const transitionTime = 1000
        const $body = $iframe.contents().find('body')

        cy.wait(transitionTime)

        cy.wrap($body).contains('How likely are you to recommend us')
        cy.wrap($body).find('[data-qa-index="10"]').click()

        cy.wait(transitionTime)

        cy.wrap($body).contains('Could you tell us why you chose')

        cy.window().then((win) => {
          ;(win as any).tf.reload()

          cy.wait(transitionTime) // wait for embedded form reload

          cy.get('iframe').then(($reloadedIframe) => {
            const $reloadedBody = $reloadedIframe.contents().find('body')
            cy.wrap($reloadedBody).contains('How likely are you to recommend us')
          })
        })
      })
    })
  })
})
