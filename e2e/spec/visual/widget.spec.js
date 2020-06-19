import { open, openOnMobile, waitForEmbed } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Embed Widget', () => {
  describe('Basic', function () {
    it('Basic Embed Widget - Desktop', () => {
      open('/widget.html')
      waitForEmbed()
      eyesCheckDesktop('Embed')
    })

    it('Basic Embed Widget - Mobile', () => {
      openOnMobile('/widget.html')
      waitForEmbed()
      eyesCheckMobile('Embed')
    })
  })

  describe('Full Page', () => {
    it('Full Page Embed Widget - Desktop', () => {
      open('/full.html')
      waitForEmbed()
      eyesCheckDesktop('Embed')
    })

    it('Full Page Embed Widget - Mobile', () => {
      openOnMobile('/full.html')
      waitForEmbed()
      eyesCheckMobile('Embed')
    })
  })
})
