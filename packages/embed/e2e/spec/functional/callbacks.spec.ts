describe('Callbacks', () => {
  it('should alert onReady on form load', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/callbacks.html').then(() => {
      expect(stub).to.be.calledWith('onReady')
    })
  })
})
