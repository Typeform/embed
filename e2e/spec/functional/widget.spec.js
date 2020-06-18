import { open, testEmbeddedForm, openOnMobile, testEmbedFormOnMobile } from '../../cypress-utils'

describe('Embed Widget in div with position:absolute on mobile', () => {
  it('Loads correctly the basic embed widget', () => {
    openOnMobile('/absolute')
    testEmbedFormOnMobile()
  })
})

describe('Basic Embed Widget', () => {
  describe('On Desktop', () => {
    it('Loads correctly the basic embed widget', () => {
      open('/widget')
      testEmbeddedForm()
    })
  })

  describe('On Mobile', () => {
    it('Loads correctly the basic embed widget', () => {
      openOnMobile('/widget')
      testEmbedFormOnMobile()
    })
  })
})

describe('Full Page Embed Widget', () => {
  const iframe = '#typeform-full'

  describe('On Desktop', () => {
    it('Loads correctly the Full Page widget', () => {
      open('/full')
      testEmbeddedForm(iframe)
    })
  })

  describe('On Mobile', () => {
    it('Loads correctly the Full Page widget', () => {
      openOnMobile('/full')
      testEmbeddedForm(iframe) // full page widget behaves the same as on desktop (no modal window)
    })
  })
})
