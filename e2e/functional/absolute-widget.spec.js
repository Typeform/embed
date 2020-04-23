import { openAsMobile, setupEmbedOnMobile } from '../cypress-utils'

describe('Embed Widget in div with position:absolute on mobile', () => {
  it('Loads correctly the basic embed widget', () => {
    openAsMobile('absolute.html')
    setupEmbedOnMobile()
  })
})
