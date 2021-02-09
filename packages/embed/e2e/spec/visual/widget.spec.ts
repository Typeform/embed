import { open, openOnMobile } from '../../cypress-utils'
import { eyesCheckDesktop, eyesCheckMobile } from '../../applitools-utils'

describe('Embed Widget', () => {
  describe('Basic', function () {
    it('Basic Embed Widget - Desktop', () => {
      open('/iframe.html?id=embed-widget--widget&viewMode=story')
      eyesCheckDesktop('Embed')
    })

    it('Basic Embed Widget - Mobile', () => {
      openOnMobile('/iframe.html?id=embed-widget--widget&viewMode=story')
      eyesCheckMobile('Embed')
    })
  })
})
