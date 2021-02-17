import { open, openOnMobile } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Embed Widget', () => {
  describe('Desktop', () => {
    before(() => {
      open('/widget-js.html')
    })

    it('Basic Embed Widget - Desktop', () => {
      eyesCheckDesktop('Embed')
    })
  })

  describe('Mobile', () => {
    before(() => {
      openOnMobile('/widget-js.html')
    })

    it('Basic Embed Widget - Mobile', () => {
      eyesCheckMobile('Embed')
    })
  })
})
