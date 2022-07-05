import { open, openOnMobile } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Chat popover', () => {
  describe('Desktop', () => {
    before(() => {
      open('/chat.html')
    })

    it('Chat popover - Desktop', () => {
      eyesCheckDesktop('Embed')
    })
  })

  describe('Mobile', () => {
    before(() => {
      openOnMobile('/chat.html')
    })

    it('Chat popover - Mobile', () => {
      eyesCheckMobile('Embed')
    })
  })
})
