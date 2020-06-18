import { open, openOnMobile, waitForEmbed } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Embed Widget', () => {
  describe('Basic', function () {
    it('Basic Embed Widget - Desktop', () => {
      open('/widget')
      waitForEmbed()
      eyesCheckDesktop('Embed')
    })

    it('Basic Embed Widget - Mobile', () => {
      openOnMobile('/widget')
      waitForEmbed()
      eyesCheckMobile('Embed')
    })
  })

  describe('Full Page', () => {
    it('Full Page Embed Widget - Desktop', () => {
      open('/full')
      waitForEmbed(500)
      eyesCheckDesktop('Embed')
    })

    it('Full Page Embed Widget - Mobile', () => {
      openOnMobile('/full')
      waitForEmbed(500)
      eyesCheckMobile('Embed')
    })
  })
})
