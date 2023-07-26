import { open, openOnMobile } from '../../cypress-utils'

describe('Chat popover', () => {
  describe('Desktop', () => {
    before(() => {
      open('/chat.html')
    })

    it('Chat popover - Desktop', () => {
      cy.vrt('Chat popover - Desktop')
    })
  })

  describe('Mobile', () => {
    before(() => {
      openOnMobile('/chat.html')
    })

    it('Chat popover - Mobile', () => {
      cy.vrt('Chat popover - Mobile')
    })
  })
})
